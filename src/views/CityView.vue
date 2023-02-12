<template>
  <div
    class="mx-auto mt-6 p-2 min-w-[18.75rem] max-w-fit flex flex-col items-center justify-center"
  >
    <div v-if="!loadingWeatherData">
      <div v-if="!errorResponse">
        <section
          class="bg-stone-100 rounded-lg p-4 divide-gray-400 divide-y-2 shadow-lg"
        >
          <CityCurrentWeatherCard
            :current-weather-data-for-render="currentWeatherDataForRender"
            :city-full-name="queryCity?.toLocaleString()"
            :saved-to-local-storage="citySavedToLocalStorage"
            @set-item-to-local-storage="
              setFineWeatherCityItemToLocalStorageFromCityView
            "
            @remove-item-from-local-storage="
              removeWeatherCityItemFromLocalStorageFromCityView
            "
          />

          <div v-if="forecastWeatherDataForRender[0]" class="pt-2">
            <ForecastTable
              :forecast-weather-day-data-for-render="
                forecastWeatherDataForRender[0]
              "
            />
          </div>
        </section>
        <section
          class="bg-stone-100 rounded-lg mt-3 p-4 divide-gray-400 divide-y-2 shadow-lg"
        >
          <h2 class="text-[1.4rem] pb-1">Forecast for 5 days</h2>
          <div class="hidden h-[25rem] md:block md:h-fit text-xl pt-2">
            <Carousel
              :slide-count="forecastWeatherDataForRender.slice(1)?.length"
              v-slot="{ currentSlide }"
            >
              <Slide
                v-for="(slide, index) in forecastWeatherDataForRender.slice(1)"
                :key="slide[0].dt"
              >
                <div v-show="currentSlide === index" class="absolute">
                  <ForecastTable
                    :forecast-weather-day-data-for-render="slide"
                    :show-title="true"
                  />
                </div>
              </Slide>
            </Carousel>
          </div>
          <div class="block md:hidden text-xl mt-2 divide-gray-400 divide-y-2">
            <p
              v-for="slide in forecastWeatherDataForRender.slice(1)"
              class="py-2"
              :key="slide[0].dt"
            >
              <ForecastTable
                :forecast-weather-day-data-for-render="slide"
                :show-title="true"
              />
            </p>
          </div>
        </section>
      </div>
      <p v-else class="text-xl mt-32 place-self-center">
        Error during fetch city's info. Try again later.
      </p>
    </div>
    <div v-else>
      <CartSkeletonWithForecast />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import type {
  CurrentWeatherDataForRender,
  ForecastItemWeatherDataForRender,
  CityLocalStorageItem,
} from "../interfaces";

import { useRoute } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

import useCurrentWeatherDataForRender from "@/composables/useCurrentWeatherDataForRender";
import useForecastWeatherDataForRender from "@/composables/useForecastWeatherDataForRender";
import {
  setFineWeatherCityItemToLocalStorage,
  getFineWeatherCitiesFromLocalStorage,
  removeWeatherCityItemFromLocalStorage,
} from "@/composables/useFineWeatherLocalStorage";

import Carousel from "@/components/Carousel.vue";
import Slide from "@/components/Slide.vue";
import ForecastTable from "@/components/ForecastTable.vue";
import CartSkeletonWithForecast from "@/components/CartSkeletonWithForecast.vue";
import CityCurrentWeatherCard from "@/components/CityCurrentWeatherCard.vue";

const route = useRoute();

const lat = ref(route.query.lat);
const lon = ref(route.query.lon);

const loadingWeatherData = ref(false);
const currentWeatherDataForRender: Ref<CurrentWeatherDataForRender | null> =
  ref(null);
const forecastWeatherDataForRender: Ref<ForecastItemWeatherDataForRender[][]> =
  ref([]);
const queryCity = ref(route.query.fullName);
const fineWeatherCitiesLocalStorage: Ref<CityLocalStorageItem[]> = ref([]);
const citySavedToLocalStorage = ref(false);
const errorResponse = ref(false);

const setFineWeatherCityItemToLocalStorageFromCityView = (
  cityItemFullName: string
): void => {
  fineWeatherCitiesLocalStorage.value = setFineWeatherCityItemToLocalStorage(
    cityItemFullName,
    lat.value?.toLocaleString(),
    lon.value?.toLocaleString(),
    fineWeatherCitiesLocalStorage.value
  );
};

const removeWeatherCityItemFromLocalStorageFromCityView = (
  cityItemFullName: string
): void => {
  fineWeatherCitiesLocalStorage.value = removeWeatherCityItemFromLocalStorage(
    cityItemFullName,
    fineWeatherCitiesLocalStorage.value
  );
};

// Long-pull for open weather API
let timerLongPullOpenWeather: ReturnType<typeof setTimeout> | null = null;

// Delay for showing skeleton
let timerForSkeletonDelay: ReturnType<typeof setTimeout> | null = null;

onMounted(async function loadWeatherData() {
  try {
    loadingWeatherData.value = true;
    errorResponse.value = false;

    timerLongPullOpenWeather = timerForSkeletonDelay = null;

    currentWeatherDataForRender.value = await useCurrentWeatherDataForRender(
      lat.value?.toLocaleString(),
      lon.value?.toLocaleString(),
      queryCity.value?.toLocaleString()
    );
    forecastWeatherDataForRender.value = await useForecastWeatherDataForRender(
      lat.value?.toLocaleString(),
      lon.value?.toLocaleString(),
      queryCity.value?.toLocaleString()
    );

    fineWeatherCitiesLocalStorage.value =
      getFineWeatherCitiesFromLocalStorage();

    fineWeatherCitiesLocalStorage.value.forEach((city) => {
      if (city.cityItemFullName === queryCity.value?.toLocaleString()) {
        citySavedToLocalStorage.value = true;
      }
    });

    timerForSkeletonDelay = setTimeout(
      () => (loadingWeatherData.value = false),
      500
    );
    timerLongPullOpenWeather = await setTimeout(loadWeatherData, 3 * 60 * 1000);
  } catch (error) {
    loadingWeatherData.value = false;
    errorResponse.value = true;
  }
});

onUnmounted(() => {
  if (timerForSkeletonDelay) clearTimeout(timerForSkeletonDelay);
  if (timerLongPullOpenWeather) clearTimeout(timerLongPullOpenWeather);

  timerLongPullOpenWeather = timerForSkeletonDelay = null;
});
</script>

<style scoped>
h2 {
  font-size-adjust: 0.46;
}
</style>

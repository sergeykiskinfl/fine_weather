<template>
  <div class="mt-12">
    <div v-if="!loadingWeatherData">
      <div v-if="!errorResponse">
        <div
          v-if="currentWeatherDataForRenderArr.length > 0"
          class="flex flex-col lg:flex-row items-center justify-center gap-5"
        >
          <section
            class="min-w-[20rem] w-fit bg-stone-100 rounded-lg p-4 shadow-lg hover:shadow-xl"
            v-for="item in currentWeatherDataForRenderArr"
            :key="item.city_full_name"
          >
            <CityCurrentWeatherCard
              :current-weather-data-for-render="item"
              :city-full-name="item.city_full_name"
              :saved-to-local-storage="true"
              :home-view="true"
              @remove-item-from-local-storage="
                removeWeatherCityItemFromLocalStorageFromHomeView
              "
              @check-full-info="checkCityView"
            />
          </section>
        </div>
        <div v-else class="flex items-center justify-center mt-10">
          <p class="text-xl">You haven't saved cities yet</p>
        </div>
      </div>
      <p v-else class="text-xl mt-32 place-self-center">
        Error during fetch cities info. Try again later.
      </p>
    </div>

    <section
      v-else
      class="flex flex-col lg:flex-row items-center justify-center gap-5"
    >
      <div
        v-for="(item, index) in Array.from({
          length: fineWeatherCitiesLocalStorage.length,
        })"
        :key="index"
      >
        <CartSkeleton />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type {
  CurrentWeatherDataForRender,
  CityLocalStorageItem,
} from "../interfaces";

import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

import useCurrentWeatherDataForRender from "@/composables/useCurrentWeatherDataForRender";
import {
  getFineWeatherCitiesFromLocalStorage,
  removeWeatherCityItemFromLocalStorage,
} from "@/composables/useFineWeatherLocalStorage";

import CityCurrentWeatherCard from "@/components/CityCurrentWeatherCard.vue";
import CartSkeleton from "./CartSkeleton.vue";

const router = useRouter();

const fineWeatherCitiesLocalStorage: Ref<CityLocalStorageItem[]> = ref([]);
const currentWeatherDataForRenderArr: Ref<CurrentWeatherDataForRender[]> = ref(
  []
);

const removeWeatherCityItemFromLocalStorageFromHomeView = (
  cityItemFullName: string
): void => {
  fineWeatherCitiesLocalStorage.value = removeWeatherCityItemFromLocalStorage(
    cityItemFullName,
    fineWeatherCitiesLocalStorage.value
  );

  currentWeatherDataForRenderArr.value =
    currentWeatherDataForRenderArr.value.filter(
      (city) => city.city_full_name !== cityItemFullName
    );
};

const checkCityView = (cityItemFullName: string): void => {
  const cityObjFromLocalStorage = fineWeatherCitiesLocalStorage.value.find(
    (city) => city.cityItemFullName === cityItemFullName
  );

  router.push({
    path: `city/${cityItemFullName.split(",")[0]}`,
    query: {
      lat: cityObjFromLocalStorage?.lat,
      lon: cityObjFromLocalStorage?.lon,
      fullName: cityItemFullName,
    },
  });
};

const loadingWeatherData = ref(false);
const errorResponse = ref(false);

// Long-pull for open Weather API
let timerLongPullOpenWeather: ReturnType<typeof setTimeout> | null = null;

// Delay for showing skeleton
let timerForSkeletonDelay: ReturnType<typeof setTimeout> | null = null;

onMounted(async function loadWeatherData() {
  try {
    loadingWeatherData.value = true;
    errorResponse.value = false;

    timerLongPullOpenWeather = timerForSkeletonDelay = null;

    fineWeatherCitiesLocalStorage.value =
      getFineWeatherCitiesFromLocalStorage();

    if (fineWeatherCitiesLocalStorage.value.length > 0) {
      const promises: Promise<CurrentWeatherDataForRender>[] =
        fineWeatherCitiesLocalStorage.value.map(
          ({ lat, lon, cityItemFullName }: CityLocalStorageItem) => {
            return useCurrentWeatherDataForRender(lat, lon, cityItemFullName);
          }
        );

      currentWeatherDataForRenderArr.value = await Promise.all(promises);

      timerForSkeletonDelay = setTimeout(
        () => (loadingWeatherData.value = false),
        500
      );

      timerLongPullOpenWeather = await setTimeout(
        loadWeatherData,
        3 * 60 * 1000
      );
    } else {
      await new Promise((resolve) => resolve("There are no saved cities")).then(
        () => {
          loadingWeatherData.value = false;
        }
      );
    }
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

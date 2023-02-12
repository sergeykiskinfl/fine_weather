<template>
  <div class="divide-gray-400 divide-y-2">
    <div class="relative text-[1.4rem] pb-2">
      <h2>
        {{ cityFullName }}
      </h2>
      <h2>
        {{ currentWeatherDataForRender?.dateArr[0] }}
      </h2>
      <button
        @click="handleSetItem"
        class="w-8 h-8 absolute top-1 right-1 text-xl hover:bg-weather-green hover:text-white duration-150 cursor-pointer rounded-full"
        v-if="!savedToLocalStorageCityCard"
        aria-label="Save city to local storage"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
      <div class="absolute flex flex-row top-1 right-1">
        <button
          @click="handleCheckFullInfo"
          class="w-8 h-8 text-xl hover:bg-weather-green hover:text-white duration-150 cursor-pointer rounded-full"
          v-if="homeView"
          aria-label="Check city's full info"
        >
          <i class="fa-solid fa-circle-info"></i>
        </button>
        <button
          @click="handleRemoveItem"
          class="w-8 h-8 text-xl hover:bg-red-500 hover:text-white duration-150 cursor-pointer rounded-full"
          v-if="savedToLocalStorageCityCard"
          aria-label="Remove city from local storage"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>

    <div class="max-h-fit py-3">
      <div class="flex flex-row items-center justify-evenly">
        <p class="text-5xl">{{ currentWeatherDataForRender?.temp }}</p>
        <img
          :src="`/images//weather-pictures/${
            currentWeatherDataForRender?.picture ?? 'unknown'
          }.png`"
          alt="current weather"
          class="w-12"
        />
        <div class="text-xl">
          <p class="first-letter:uppercase inline whitespace-nowrap">
            {{ currentWeatherDataForRender?.weather_description }}
          </p>
          <p>Feels like {{ currentWeatherDataForRender?.feels_like }}</p>
        </div>
      </div>
      <div
        class="flex flex-col w-fit items-start gap-2 sm:flex-row sm:items-center sm:gap-3 pt-5"
      >
        <div class="flex flex-row items-center gap-2">
          <img
            src="/images/weather-kind-pictures/wind.png"
            alt="wind"
            class="w-8 h-8"
          />
          <div class="inline whitespace-nowrap">
            <p>{{ currentWeatherDataForRender?.wind_speed }}</p>
            <p>{{ currentWeatherDataForRender?.wind_direction }}</p>
          </div>
        </div>

        <div class="-ml-1 min-w-fit">
          <div class="inline whitespace-nowrap">
            <img
              src="/images/weather-kind-pictures/humidity.png"
              alt="humidity"
              class="w-8 inline"
            />
            <p class="inline -ml-1">
              {{ currentWeatherDataForRender?.humidity }}
            </p>
          </div>
        </div>
        <div class="mx-0 min-w-fit">
          <div class="inline whitespace-nowrap">
            <img
              src="/images/weather-kind-pictures/pressure.png"
              alt="pressure"
              class="w-8 inline mr-1"
            />
            <p class="inline">
              {{ currentWeatherDataForRender?.pressure }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CurrentWeatherDataForRender } from "../interfaces";

import { ref, toRefs } from "vue";

const emit = defineEmits([
  "setItemToLocalStorage",
  "removeItemFromLocalStorage",
  "checkFullInfo",
]);
const props = withDefaults(
  defineProps<{
    currentWeatherDataForRender: CurrentWeatherDataForRender | null;
    cityFullName: string | undefined;
    savedToLocalStorage?: boolean;
    homeView?: boolean;
  }>(),
  {
    savedToLocalStorage: false,
    homeView: false,
  }
);

const {
  currentWeatherDataForRender,
  cityFullName,
  savedToLocalStorage,
  homeView,
} = toRefs(props);
const savedToLocalStorageCityCard = ref(savedToLocalStorage.value);

const handleSetItem = (): void => {
  emit("setItemToLocalStorage", cityFullName.value);
  savedToLocalStorageCityCard.value = true;
};

const handleRemoveItem = (): void => {
  emit("removeItemFromLocalStorage", cityFullName.value);
  savedToLocalStorageCityCard.value = false;
};

const handleCheckFullInfo = (): void => {
  emit("checkFullInfo", cityFullName.value);
};
</script>

<style scoped>
h2 {
  font-size-adjust: 0.46;
}
</style>
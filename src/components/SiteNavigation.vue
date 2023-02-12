<template>
  <header class="sticky z-10 top-0 bg-weather-primary shadow-lg">
    <nav class="container py-4 flex flex-col sm:flex-row items-center">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3" aria-label="Home link">
          <img src="/images/weather-pictures/03d.png" class="w-10 h-10" />
          <p class="text-2xl">Fine Weather</p>
        </div>
      </RouterLink>
      <div class="flex flex-1 justify-end gap-3">
        <p class="text-2xl cursor-pointer" @click="toggleModal" aria-label="Open modal about program">About</p>
      </div>
      <ModalInfo :modal-active="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="md:text-2xl md:mb-1">About:</h1>
          <p class="text-sm md:mb-4">
            The Fine Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="md:text-2xl">How it works:</h2>
          <ol class="list-decimal text-sm list-inside md:mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather and forecast for 5 days for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" button in the top right of the city's card.
              This will save the city to view at a later time on the home page (max 3 cities).
            </li>
            <li>
              If you like to view previously saved city, click on the "i" button.
            </li>
            <li>
              You can browse forecast's data by clicking arrow buttons and circles at the bottom.
            </li>           
          </ol>

          <h2 class="md:text-2xl">Removing a city:</h2>
          <p class="text-sm">
            If you no longer wish to track a city, click on the trash button.
          </p>
        </div>
      </ModalInfo>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";

// import titleImageUrl from "@/assets/weather-pictures/01d.png";
import ModalInfo from "./ModalInfo.vue";

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <div
    class="relative w-full h-[22rem]"
    @mouseover="showNavigation = true"
    @mouseout="showNavigation = false"
  >
    <slot :currentSlide="currentSlide"></slot>
    <transition name="slide-navigation">
      <div
        class="absolute w-full h-full flex items-center justify-center px-2"
        v-show="showNavigation"
      >
        <div class="flex flex-1" aria-label="Previous slide">
          <i @click="prevSlide" class="fas fa-chevron-left"></i>
        </div>
        <div class="flex flex-1 justify-end" aria-label="Next slide">
          <i @click="nextSlide" class="fas fa-chevron-right"></i>
        </div>
      </div>
    </transition>
    <div
      class="absolute w-full bottom-2 flex items-center justify-center gap-3"
    >
      <span
        v-for="(slide, index) in slideCount"
        @click="goToSlide(index)"
        :key="index"
        :class="`${
          currentSlide === index ? 'bg-weather-green' : 'bg-weather-primary'
        }`"
        class="cursor-pointer w-5 h-5 rounded-full"
        :aria-label="`Go to slide ${index}`"
      >
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    slideCount: number;
  }>(),
  {
    slideCount: 1,
  }
);

const currentSlide = ref(0);
const slideCount = ref(props.slideCount);
const showNavigation = ref(false);

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

const nextSlide = () => {
  if (currentSlide.value === slideCount.value - 1) {
    currentSlide.value = 0;
  } else {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value === 0) {
    currentSlide.value = slideCount.value - 1;
  } else {
    currentSlide.value--;
  }
};
</script>

<style scoped>
.slide-navigation-enter-active {
  transition: opacity 0.5s ease-in-out;
}
.slide-navigation-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.slide-navigation-enter-from,
.slide-navigation-leave-to {
  opacity: 0;
}
.slide-navigation-enter-to,
.slide-navigation-leave-from {
  opacity: 1;
}

i {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #08a089;
  color: #fff;
}
</style>

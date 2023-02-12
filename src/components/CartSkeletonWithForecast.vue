<template>
  <div v-once class="animate-pulse w-[18.5rem]">
    <section
      class="bg-stone-100 shadow-inner rounded-lg p-4 mt-3 divide-gray-400 divide-y-2"
    >
      <div class="text-2xl pb-2">
        <div class="h-[1.8rem] rounded-full bg-weather-primary mb-1"></div>
        <div class="h-[1.8rem] rounded-full bg-weather-primary"></div>
      </div>
      <div class="py-3">
        <div class="flex flex-row items-center gap-3">
          <div class="w-full h-12 rounded-full bg-weather-primary"></div>
        </div>
        <div class="h-[1.8rem] rounded-full bg-weather-primary mt-5"></div>
      </div>
      <div class="pt-3">
        <div
          v-for="(item, index) in Array.from({ length: 7 })"
          class="h-5 rounded-full bg-weather-primary mb-3"
          :key="index"
        ></div>
      </div>
    </section>
    <section
      class="bg-stone-100 rounded-lg shadow-inner mt-3 p-4 divide-gray-400 divide-y-2"
    >
      <div class="h-[1.8rem] rounded-full bg-weather-primary mb-3"></div>
      <div class="pt-4 hidden md:block md:h-[22.5rem]">
        <div class="h-[1.5rem] rounded-full bg-weather-primary"></div>
        <div class="pt-3">
          <div
            v-for="(item, index) in Array.from({ length: 8 })"
            class="h-5 rounded-full bg-weather-primary mb-3"
            :key="index"
          ></div>
        </div>
        <div class="relative mt-8 h-[2rem] flex justify-center">
          <div
            class="absolute bottom-2 h-[1.5rem] w-[12.5rem] rounded-full bg-weather-primary"
          ></div>
        </div>
      </div>
      <div class="block md:hidden pt-1 divide-gray-400 divide-y-2">
        <div
          v-for="(item, index) in Array.from({ length: 5 })"
          class="pt-3"
          :key="index"
        >
          <div class="h-[1.5rem] rounded-full bg-weather-primary mb-3"></div>
          <div
            v-for="(item, index) in Array.from({ length: 8 })"
            class="h-5 rounded-full bg-weather-primary mb-2"
            :key="index"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

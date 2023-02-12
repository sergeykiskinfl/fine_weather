<template>
  <div v-once class="animate-pulse w-[18rem] sm:w-[21.5rem]">
    <section
      class="bg-stone-100 shadow-inner rounded-lg p-4 divide-gray-400 divide-y-2"
    >
      <div class="text-2xl pb-2">
        <div class="h-[1.8rem] rounded-full bg-weather-primary mb-1"></div>
        <div class="h-[1.8rem] rounded-full bg-weather-primary"></div>
      </div>
      <div class="py-3">
        <div class="flex flex-row items-center gap-3">
          <div class="w-full h-12 rounded-full bg-weather-primary"></div>
        </div>
        <div class="h-[3.8rem] rounded-full bg-weather-primary mt-5"></div>
      </div>
    </section>
  </div>
</template>

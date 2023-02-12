<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation />
    <RouterView v-slot="{ Component }" mode="out-in">
      <Transition name="page" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 500ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}


</style>
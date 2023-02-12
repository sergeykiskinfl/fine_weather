<template>
  <teleport to="body">
    <transition name="modal-outer">
      <div
        v-show="modalActive"
        class="backdrop-blur-sm z-10 w-full weather-outer-modal bg-black bg-opacity-30 px-8"
      >
        <transition name="modal-inner">
          <div
            v-if="modalActive"
            class="relative weather-inner-modal p-4 bg-white max-w-screen-md"
          >
            <button
              class="absolute top-2 right-2 w-8 h-8 hover:bg-red-500 hover:text-white duration-150"
              @click="$emit('close-modal')"
              aria-label="Close modal"
            >
              <i class="fa fa-times fa-lg"></i>
            </button>
            <slot></slot>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineEmits(["close-modal"]);
const props = withDefaults(
  defineProps<{
    modalActive: boolean;
  }>(),
  {
    modalActive: false,
  }
);
</script>

<style lang="scss" scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.5s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;  
}

.weather-outer-modal {
  position: fixed;
  transform: translate3d(0,0,0);
  margin: 0;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.weather-inner-modal {
  top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%);
}

</style>

<template>
  <div id="c-base-modal" class="base-modal">
    <div v-if="!hideLayer" class="base-modal__layer" @click="closeHandle" />

    <div :class="baseCardClass">
      <div class="base-modal__content-header pb-2 border-b border-b-gray-400">
        <slot name="header" />
      </div>

      <div class="base-modal__content-body py-4">
        <slot name="body" />
      </div>

      <div class="base-modal__content-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'

const componentProps = defineProps({
  hideLayer: {
    type: Boolean,
    default: false
  },
  responsive: {
    type: Boolean,
    default: false
  },
  wider: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const baseCardClass = computed(() => {
  let customClass = 'base-modal__content rounded-md bg-white p-4'

  if (componentProps.responsive) {
    customClass = `md:w-7/12 md:h-auto w-full h-full ${customClass}`
  } else if (componentProps.wider) {
    customClass = `base-modal__content-wider px-5 ${customClass}`
  } else {
    customClass = `base-modal__content-default-width mx-auto ${customClass}`
  }

  return customClass
})

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.body.style.overflow = 'auto'
})

function closeHandle() {
  emit('close')
}
</script>

<style>
.base-modal__layer {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: var(--min-z-index);
}

.base-modal__content {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: var(--z-index);
  animation: pop-up 0.1s ease-in-out forwards;
}
.base-modal__content-default-width {
  max-width: 300px;
  width: 100%;
}
.base-modal__content-wider {
  max-width: 500px;
  width: 100%;
}
.base-modal__content-body {
  height: 100%;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

@keyframes pop-up {
  0% {
    transform: translate(-50%, -50%) scale(0.7);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>

<template>
  <div id="c-action-buttons">
    <div :class="buttonContainerClass">
      <!-- <BaseButton
        v-if="!oneAction"
        :text="cancelText"
        class="mr-2"
        type="secondary"
        @click="emit('cancel')"
      /> -->
      <button
        v-if="!oneAction"
        type="button"
        class="mr-2"
        data-type="secondary"
        @click="emit('cancel')"
      >
        {{ cancelText }}
      </button>
      <!-- <BaseButton :text="confirmText" :type="confirmButtonType" @click="emit('confirm')" /> -->
      <button type="button" class="mr-2" :data-type="confirmButtonType" @click="emit('confirm')">
        {{ confirmText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const componentProps = defineProps({
  centered: {
    type: Boolean,
    default: false
  },
  rightAlign: {
    type: Boolean,
    default: false
  },
  leftAlign: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  oneAction: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmButtonType: {
    type: String,
    default: 'primary'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const buttonContainerClass = computed(() => {
  let customClass = 'flex w-full'

  if (componentProps.centered) {
    customClass += ' justify-center'
  } else if (componentProps.rightAlign) {
    customClass += ' justify-end'
  } else if (componentProps.leftAlign) {
    customClass += ' justify-start'
  }

  return customClass
})
</script>

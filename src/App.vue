<script setup lang="ts">
import { RouterView } from 'vue-router'

// components
import Footer from '@/components/Footer.vue'
</script>

<template>
  <main class="p-2">
    <RouterView />
  </main>

  <Footer />
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--footer-height) - 100px);
}
</style>

<script setup lang="ts">
// components
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <div class="container mx-auto todovoice__home flex flex-col justify-start lg:justify-center">
    <TodoList />
  </div>
</template>

<style>
.todovoice__home {
  min-height: calc(100vh - 16px - var(--footer-height));
}

@media (min-width: 1024px) {
  .todovoice__home {
    min-height: calc(100vh - 76px);
  }
}
</style>

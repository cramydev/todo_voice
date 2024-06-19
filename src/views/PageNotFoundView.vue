<template>
  <div
    id="v-page-not-found-view"
    class="flex items-center justify-center flex-col h-full"
  >
    <p class="text-8xl mb-2">4🫥4</p>
    <p class="text-4xl">
      {{ pageContentStore.generalContent.pageNotFound[language] }}
    </p>
    <span
      class="text-center mt-4 cursor-pointer text-primary-color"
      @click="goToHandle"
    >
      {{ pageContentStore.generalContent.goBack[language] }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

// stores
import { usePageContentStore } from "@/stores/page_content";

const pageContentStore = usePageContentStore();
const { language } = storeToRefs(pageContentStore);
const router = useRouter();

function goToHandle() {
  router.go(-1);
}
</script>

<style>
#v-page-not-found-view {
  min-height: calc(100vh - 16px - var(--footer-height));
}

@media (min-width: 1024px) {
  #v-page-not-found-view {
    min-height: calc(100vh - 76px);
  }
}
</style>

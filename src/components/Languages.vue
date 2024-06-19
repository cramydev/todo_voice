<template>
  <div id="c-languages" class="rounded-full p-1 px-4 bg-[#0D72B9]">
    <p class="capitalize cursor-pointer text-xl text-white" @click="languageSelectionHandle()">
      {{ languageName }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

// stores
import { usePageContentStore } from '@/stores/page_content'

const pageContentStore = usePageContentStore()
const { language, languageName } = storeToRefs(pageContentStore)

function languageSelectionHandle() {
  const currentLang = (pageContentStore.languages.find(
    (item) => item.value.toLowerCase() !== language.value.toLowerCase()
  )?.value || 'en') as 'es' | 'en'

  pageContentStore.setLanguageHandle(currentLang)
}
</script>

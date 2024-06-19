<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

// components
import DevelopedBy from '@/components/DevelopedBy.vue'
import BaseModal from '@/components/BaseModal.vue'
import ActionButtons from '@/components/ActionButtons.vue'

// stores
import { usePageContentStore } from '@/stores/page_content'

const pageContentStore = usePageContentStore()
const { language } = storeToRefs(pageContentStore)

const showAbout = ref(true)
const showCommands = ref(false)

const redirection = () => {
  window.open('https://cramydev.netlify.app/', '_blank')
}

const aboutHandle = () => {
  showAbout.value = !showAbout.value
}
const commandsHandle = () => {
  showCommands.value = !showCommands.value
}
</script>

<template>
  <div id="footer" class="px-4">
    <section
      class="flex flex-col lg:flex-row justify-center lg:justify-between items-center container mx-auto w-full h-full"
    >
      <section class="mb-4 lg:mb-0 w-fit">
        <DevelopedBy class="cursor-pointer" @click="redirection" />
      </section>

      <section class="flex items-center flex-col lg:flex-row lg:justify-end justify-center">
        <p class="mb-2 lg:mb-0 lg:mr-4 cursor-pointer" @click="aboutHandle">
          {{ pageContentStore.footerContent.about[language] }}
        </p>
        <p class="cursor-pointer" @click="commandsHandle">
          {{ pageContentStore.footerContent.commands[language] }}
        </p>
      </section>
    </section>

    <BaseModal v-if="showAbout" wider>
      <template #header>
        <p class="text-3xl font-bold">
          {{ pageContentStore.footerContent.about[language] }}
        </p>
      </template>

      <template #body>
        <ul class="pl-4">
          <li
            v-for="(item, index) in pageContentStore.footerContent.aboutData[language]"
            :key="`about-${index}`"
          >
            <p>
              {{ item }}
            </p>
          </li>
        </ul>
      </template>

      <template #footer>
        <ActionButtons
          centered
          oneAction
          :confirmText="pageContentStore.generalContent.close[language]"
          @confirm="aboutHandle"
        />
      </template>
    </BaseModal>

    <BaseModal v-if="showCommands" wider>
      <template #header>
        <p class="text-3xl font-bold">
          {{ pageContentStore.footerContent.commands[language] }}
        </p>
      </template>

      <template #body>
        <p class="text-xl font-bold">English</p>
        <ul class="pl-4">
          <li
            v-for="(item, index) in pageContentStore.footerContent.commandsData.en"
            :key="`english-command-${index}`"
          >
            <p v-html="item" />
          </li>
        </ul>

        <p class="text-xl font-bold mt-4">Español</p>
        <ul class="pl-4">
          <li
            v-for="(item, index) in pageContentStore.footerContent.commandsData.es"
            :key="`spanish-command-${index}`"
          >
            <p v-html="item" />
          </li>
        </ul>
      </template>

      <template #footer>
        <ActionButtons
          centered
          oneAction
          :confirmText="pageContentStore.generalContent.close[language]"
          @confirm="commandsHandle"
        />
      </template>
    </BaseModal>
  </div>
</template>

<style>
#footer {
  height: 100%;
}

@media (min-width: 1024px) {
  #footer {
    height: var(--footer-height);
  }
}
</style>

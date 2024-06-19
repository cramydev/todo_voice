<script setup lang="ts">
import { storeToRefs } from "pinia";

// components
import ListItem from "@/components/ListItem.vue";
import RecordIcon from "@/components/RecordIcon.vue";
import Languages from "@/components/Languages.vue";

// stores
import { useListItems } from "@/stores/list_items";
import { usePageContentStore } from "@/stores/page_content";

const pageContentStore = usePageContentStore();
const { language } = storeToRefs(pageContentStore);

const listItemsStore = useListItems();
const { listItems } = storeToRefs(listItemsStore);
</script>

<template>
  <div class="w-full lg:w-3/4 mx-auto">
    <section class="rounded-lg p-2 bg-amber-400 mb-4 w-full lg:w-1/2 mx-auto">
      <p class="text-center font-bold">
        {{ pageContentStore.generalContent.warningInfo[language] }}
      </p>
    </section>

    <div class="rounded border-2 border-[#0D72B9] p-4">
      <section class="flex items-center justify-between mb-4">
        <p class="text-2xl font-bold">TO-DO List</p>
        <Languages />
      </section>

      <p v-if="!listItems.length" class="text-center my-8">
        {{ pageContentStore.toDoListContent.noItems[language] }}
      </p>

      <div class="todovoice__todo-list">
        <ListItem
          v-for="(item, index) in listItems"
          :key="item.id"
          :listItem="item"
          :class="index < listItems.length - 1 ? 'mb-2' : null"
        />
      </div>
    </div>

    <RecordIcon />
  </div>
</template>

<style>
.todovoice__todo-list {
  height: calc(100vh - 500px);
  overflow-y: auto;
}

@media (min-width: 1024px) {
  .todovoice__todo-list {
    height: calc(100vh - 600px);
  }
}
</style>

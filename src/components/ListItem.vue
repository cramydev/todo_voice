<script setup lang="ts">
import { type PropType, ref, watch } from 'vue'

// types
import type { ListItem } from '@/types/list'

// stores
import { useListItems } from '@/stores/list_items'

const listItemsStore = useListItems()

const props = defineProps({
  listItem: {
    type: Object as PropType<ListItem>,
    default: () => {}
  }
})

const listItemData = ref<ListItem | null>(null)

watch(
  () => props.listItem,
  () => {
    listItemData.value = props.listItem
  },
  { immediate: true }
)

const editHandle = (id: number) => {
  listItemsStore.setListItemToManage(id)
}
const deleteHandle = (id: number) => {
  listItemsStore.removeListItem(id)
}
</script>

<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex items-center">
      <input type="checkbox" class="mr-2" v-model="listItemData!.completed" />
      <p class="text-base font-bold">{{ `${listItem.id} - ${listItemData?.title}` }}</p>
    </div>

    <div class="flex items-center ml-2">
      <div class="cursor-pointer mr-2" @click="editHandle(listItemData!.id)">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          class="stroke-neutral-400"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
          <path d="M13.5 6.5l4 4" />
        </svg>
      </div>
      <div class="cursor-pointer" @click="deleteHandle(listItemData!.id)">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          class="stroke-red-400"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </div>
    </div>
  </div>
</template>

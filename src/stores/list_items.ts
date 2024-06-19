import { ref } from "vue";
import { defineStore } from "pinia";

// types
import type { NumberMap } from "@/types/list";

export const useListItems = defineStore('list_items', () => {
  const itemsLimit = 20
  const numberMap: NumberMap = {
    en: {
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4,
      'five': 5,
      'six': 6,
      'seven': 7,
      'eight': 8,
      'nine': 9,
      'ten': 10,
      'eleven': 11,
      'twelve': 12,
      'thirteen': 13,
      'fourteen': 14,
      'fifteen': 15,
      'sixteen': 16,
      'seventeen': 17,
      'eighteen': 18,
      'nineteen': 19,
      'twenty': 20
    },
    es: {
      'uno': 1,
      'dos': 2,
      'tres': 3,
      'cuatro': 4,
      'cinco': 5,
      'seis': 6,
      'siete': 7,
      'ocho': 8,
      'nueve': 9,
      'diez': 10,
      'diéz': 10,
      'once': 11,
      'doce': 12,
      'trece': 13,
      'catorce': 14,
      'quince': 15,
      'dieciséis': 16,
      'dieciseis': 16,
      'diecisiete': 17,
      'dieciocho': 18,
      'diecinueve': 19,
      'veinte': 20
    }
  }
  const defaultListItems = [
    {
      id: 1,
      title: 'Drink some coffee ☕️!',
      completed: false
    },
    {
      id: 2,
      title: 'Meeting with the team 👨‍💻!',
      completed: false
    },
    {
      id: 3,
      title: 'Have one more fight with that damn bug 😤!!',
      completed: false
    },
    {
      id: 4,
      title: "Drink water. Don't forget to hydrate! 🫵",
      completed: false
    },
    {
      id: 5,
      title: 'Another meeting 🫠',
      completed: false
    },
    {
      id: 6,
      title: 'Another cup of coffee ☕️',
      completed: false
    }
  ]

  const itemToManage = ref<number | null>(null)
  const itemText = ref('')
  const listItems = ref([...defaultListItems])

  const addListItem = (title: string) => {
    listItems.value.push({
      id: listItems.value.length + 1,
      title,
      completed: false
    })
  }

  const removeListItem = (id: number) => {
    listItems.value = listItems.value.filter(item => item.id !== id)
  }

  const editListItem = (title: string) => {
    const index = listItems.value.findIndex(item => item.id === itemToManage.value)
    if (index > 0) listItems.value[index].title = title
  }

  const setListItemToManage = (id: number) => {
    itemToManage.value = id

    const index = listItems.value.findIndex(subItem => subItem.id === id)

    if (index >= 0) {
      itemText.value = listItems.value[index].title
    }
  }

  const clearList = () => {
    listItems.value = []
  }

  const resetList = () => {
    listItems.value = [...defaultListItems]
  }

  return {
    listItems,
    itemToManage,
    itemText,
    numberMap,
    itemsLimit,
    addListItem,
    removeListItem,
    editListItem,
    setListItemToManage,
    clearList,
    resetList
  }
})
<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

// stores
import { useListItems } from "@/stores/list_items";
import { usePageContentStore } from "@/stores/page_content";

const pageContentStore = usePageContentStore();
const { language } = storeToRefs(pageContentStore);
const listItemsStore = useListItems();
const { itemText, listItems } = storeToRefs(listItemsStore);

const listened = ref(false);
const listening = ref(false);
const error = ref(false);
const success = ref(false);
const executed = ref(false);
const recognitionData = ref(null) as any;
const textResult = ref("");
const message = ref("");

watch(
  () => success.value,
  (value) => {
    if (value) {
      setTimeout(() => {
        success.value = false;
      }, 1000);
    }
  },
  { immediate: true }
);
watch(
  () => itemText.value,
  (value) => {
    if (value) {
      textResult.value = value;
    }
  },
  { immediate: true }
);

const startRecording = () => {
  executed.value = false;
  error.value = false;
  success.value = false;
  listened.value = false;
  message.value = "";
  listening.value = !listening.value;

  if (!listening.value) {
    if (recognitionData.value) recognitionData.value.stop();
    return;
  }

  if (listItems.value.length >= listItemsStore.itemsLimit) {
    message.value =
      pageContentStore.listeningContent.itemsLimit[language.value];
    return;
  }

  const recognition = new ((window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition ||
    (window as any).mozSpeechRecognition ||
    (window as any).msSpeechRecognition)();

  recognition.lang = language.value === "es" ? "es-US" : "en-US";
  recognition.continuous = false;

  recognitionData.value = recognition;

  recognition.start();

  recognition.onresult = (event: any) => {
    if (!event.results[0][0].transcript) {
      error.value = true;
      message.value =
        pageContentStore.listeningContent.didntHear[language.value];
      return null;
    } else {
      success.value = true;
    }

    const formattedText: string =
      event.results[0][0].transcript
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") || "";

    let currentTask = "";
    let itemId = 0;

    let addAction =
      formattedText.startsWith("add new item") ||
      formattedText.startsWith("agregar nuevo item");
    let editAction =
      formattedText.startsWith("edit item") ||
      formattedText.startsWith("editar item");
    let deleteAction =
      formattedText.startsWith("delete item") ||
      formattedText.startsWith("eliminar item");
    let deleteAllAction =
      formattedText.startsWith("delete all") ||
      formattedText.startsWith("eliminar todo");
    let resetListAction =
      formattedText.startsWith("reset list") ||
      formattedText.startsWith("resetear lista");

    if (addAction) {
      executed.value = true;
      listened.value = true;
      currentTask = formattedText
        .replace(checkCommandToReplace("add"), "")
        .trim();
      listItemsStore.addListItem(currentTask);
      message.value =
        pageContentStore.listeningContent.itemAdded[language.value];

      return null;
    } else if (editAction) {
      executed.value = true;
      listened.value = true;
      let value = formattedText
        .replace(checkCommandToReplace("edit"), "")
        .trim();

      itemId = checkCommandValue(value).valid
        ? Number(checkCommandValue(value).value)
        : 0;

      if (itemId) {
        listItemsStore.setListItemToManage(itemId);
        message.value =
          pageContentStore.listeningContent.itemEdited[language.value];
      }

      return null;
    } else if (deleteAction) {
      executed.value = true;
      listened.value = true;
      let value = formattedText
        .replace(checkCommandToReplace("delete"), "")
        .trim();

      itemId = checkCommandValue(value).valid
        ? Number(checkCommandValue(value).value)
        : 0;

      if (itemId) {
        listItemsStore.removeListItem(itemId);
        message.value =
          pageContentStore.listeningContent.itemDeleted[language.value];
      }

      return null;
    } else if (deleteAllAction) {
      executed.value = true;
      listItemsStore.clearList();
      return null;
    } else if (resetListAction) {
      executed.value = true;
      listItemsStore.resetList();
      return null;
    } else {
      currentTask = formattedText;
    }

    textResult.value += currentTask ? ` ${currentTask}` : "";
  };

  recognition.onend = () => {
    if ((!textResult.value || !listened.value) && !message.value) {
      message.value =
        pageContentStore.listeningContent.didntHear[language.value];
      error.value = true;
    } else {
      message.value = "";
    }

    listening.value = false;
  };

  recognition.onaudiostart = () => {
    message.value = pageContentStore.listeningContent.listening[language.value];
  };

  recognition.onspeechstart = () => {
    message.value = pageContentStore.listeningContent.hearing[language.value];
    listened.value = true;
  };

  recognition.onspeechend = () => {
    if (!textResult.value && !executed.value) {
      error.value = true;

      message.value = listened.value
        ? pageContentStore.listeningContent.didntUnderstand[language.value]
        : pageContentStore.listeningContent.didntHear[language.value];
    }
  };

  recognition.error = () => {
    message.value = pageContentStore.listeningContent.cantHear[language.value];

    if (!textResult.value) {
      error.value = true;
    }
  };
};

const add = () => {
  message.value = "";

  if (!itemText.value && !textResult.value) {
    message.value =
      pageContentStore.listeningContent.needToAddItem[language.value];
    return;
  }

  if (itemText.value) {
    listItemsStore.editListItem(textResult.value);
  } else {
    listItemsStore.addListItem(textResult.value);
  }
  textResult.value = "";
};

const checkCommandToReplace = (command: "add" | "edit" | "delete") => {
  let toReplace = "";

  if (command === "add") {
    toReplace = language.value === "es" ? "agregar nuevo item" : "add new item";
  } else if (command === "edit") {
    toReplace = language.value === "es" ? "editar item" : "edit item";
  } else if (command === "delete") {
    toReplace = language.value === "es" ? "eliminar item" : "delete item";
  }

  return toReplace;
};
const checkCommandValue = (value: string) => {
  let toReturn = "";
  let valid = true;

  if (!value) {
    return {
      value: "",
      valid: false,
    };
  }

  if (isNaN(Number(value))) {
    valid = !!listItemsStore.numberMap[language.value][value];
    toReturn = listItemsStore.numberMap[language.value][value].toString();
  } else {
    toReturn = value;
  }

  return {
    value: toReturn,
    valid,
  };
};
</script>

<template>
  <div
    class="todovoice__record-icon w-full flex flex-col items-center justify-center py-4"
  >
    <div
      :class="[
        'relative rounded-full border border-neutral-600 p-2 w-20 h-20 flex items-center justify-center cursor-pointer mb-2 transition linear duration-300',
        listening
          ? 'bg-[#0D72B9]'
          : error
            ? 'bg-red-400'
            : success
              ? 'bg-green-400'
              : 'bg-white',
      ]"
      @click="startRecording"
    >
      <div
        :class="[
          'absolute w-20 h-20',
          { 'todovoice__record-icon__sound': listening },
        ]"
      />
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="
          listening
            ? 'transition linear duration-300 stroke-white'
            : 'transition linear duration-300 stroke-[#4d4d4d]'
        "
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"
        />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <path d="M8 21l8 0" />
        <path d="M12 17l0 4" />
      </svg>
    </div>

    <div class="todovoice__record-icon__message mb-4">
      <span class="text-center text-sm">{{ message }}</span>
    </div>

    <div class="w-full md:w-3/4">
      <textarea
        name="textResult"
        rows="4"
        v-model="textResult"
        :disabled="listening"
        :placeholder="pageContentStore.listeningContent.placeholder[language]"
        class="w-full rounded border border-neutral-600 p-2"
      />

      <div class="flex justify-center mt-4">
        <button :disabled="listening" data-type="primary" @click="add">
          {{ pageContentStore.generalContent.save[language] }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
textarea {
  resize: none;
}
.todovoice__record-icon__message {
  height: 24px;
}

.todovoice__record-icon__sound {
  border-radius: 100%;
  border-width: 2px;
  border-style: solid;
  animation: listening 1.5s infinite;
}

@keyframes listening {
  0% {
    opacity: 1;
    transform: scale(0.9);
    border-color: rgba(var(--primary-color-rgba), 0.1);
  }
  50% {
    border-color: rgba(var(--primary-color-rgba), 0.5);
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
    border-color: rgba(var(--primary-color-rgba), 1);
  }
}
</style>

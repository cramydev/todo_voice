import { ref } from "vue";
import { defineStore } from "pinia";

// types
import type {
  Language,
  LanguageName,
  GeneralContent,
  ListeningContent,
  FooterContent,
  ToDoListContent,
} from "@/types/page_content";

export const usePageContentStore = defineStore("page_content_store", () => {
  const language = ref<Language>("es");
  const languageName = ref<LanguageName>("Español");
  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
  ];

  const footerContent: FooterContent = {
    about: {
      en: "About",
      es: "Acerca",
    },
    aboutData: {
      en: [
        "This is a to-do list app which allows you to add, edit, and delete items using voice commands. You also do these actions manually.",
        "The data is not being saved, so if you refresh the page, all the data will be lost.",
        "Voice recognition will respond based on the selected language, check button above.",
        "Voice recognition is not perfect, the result might vary depending on the language, pronuntiation and/or accent.",
        "Due to how it's built and how the voice commands works, list items are limited to 20.",
      ],
      es: [
        "Esta es una aplicación de to-do list que te permite agregar, editar y eliminar items usando comandos de voz. También puedes hacer estas acciones manualmente.",
        "Los datos no se están guardando, así que si refrescas la página, todos los datos se perderán.",
        "El reconocimiento de voz responderá basado en el idioma seleccionado, revisa el botón arriba.",
        "El reconocimiento de voz no es perfecto, el resultado puede variar dependiendo del idioma, pronunciación y/o acento.",
        "Debido a cómo está construido y cómo funcionan los comandos de voz, los items de la lista están limitados a 20."
      ],
    },
    commands: {
      en: "Voice commands",
      es: "Comandos de voz",
    },
    commandsData: {
      en: [
        "<b>[add new item]:</b> Adds a new item to the list.",
        "<b>[edit item X]:</b> Gets the item number X, and set it in the text field.",
        "<b>[delete item X]:</b> Deletes the item number X.",
        "<b>[delete all]:</b> Deletes all items.",
        "<b>[reset list]:</b> Resets the list to its default values.",
      ],
      es: [
        "<b>[agregar nuevo item]:</b> Agrega un nuevo elemento a la lista.",
        "<b>[editar item X]:</b> Obtiene el elemento número X, y lo coloca en el campo de texto.",
        "<b>[eliminar item X]:</b> Elimina el elemento número X.",
        "<b>[eliminar todo]:</b> Elimina todos los elementos.",
        "<b>[reiniciar lista]:</b> Reinicia la lista a sus valores predeterminados.",
      ],
    },
  }
  const listeningContent: ListeningContent = {
    placeholder: {
      en: 'Type or say something...',
      es: 'Escribe o di algo...'
    },
    didntHear: {
      en: "Sorry, I didn't hear you 👴🏻. Please try again.",
      es: 'Disculpa, no te escuché 👴🏻. Por favor intenta de nuevo.'
    },
    itemAdded: {
      en: 'New item added successfully 🎉',
      es: 'Item agregado exitosamente 🎉'
    },
    itemEdited: {
      en: 'Item edited 👍',
      es: 'Item editado 👍'
    },
    itemDeleted: {
      en: 'Item deleted 🗑️',
      es: 'Item eliminado 🗑️'
    },
    listening: {
      en: 'Listening...',
      es: 'Escuchando...'
    },
    hearing: {
      en: "Ok, I'm hearing you.",
      es: 'Ok, te estoy escuchando.'
    },
    didntUnderstand: {
      en: "Ok, I did listen this time, but I didn't understand 🫠. Please try again.",
      es: 'Ok, escuché esta vez, pero no entendí 🫠. Por favor intenta de nuevo.'
    },
    cantHear: {
      en: "Sorry, I can't hear you 👴🏻. Please try again.",
      es: 'Disculpa, no puedo escucharte 👴🏻. Por favor intenta de nuevo.'
    },
    itemsLimit: {
      en: "You've reached the limit of items to do. Please delete some items before adding more.",
      es: 'Has llegado al límite de elementos por hacer. Por favor elimina algunos elementos antes de agregar más.'
    },
    needToAddItem: {
      en: 'You need to type something.',
      es: 'Necesitas escribir algo.'
    }
  }
  const generalContent: GeneralContent = {
    save: {
      en: "Save",
      es: "Guardar",
    },
    close: {
      en: "Close",
      es: "Cerrar",
    },
    warningInfo: {
      en: "Voice recognition might not work properly depending on the browser. Please use Chrome preferably.",
      es: "El reconocimiento de voz puede no funcionar correctamente dependiendo del navegador. Por favor usa Chrome preferiblemente.",
    }
  }
  const toDoListContent: ToDoListContent = {
    noItems: {
      en: "No items to do 🎉. Enjoy your day!",
      es: "No hay elementos por hacer 🎉. ¡Disfruta tu día!",
    }
  }


  function setLanguageHandle(newLanguage: Language) {
    language.value = newLanguage;
    languageName.value = (languages.find((lang) => lang.value === newLanguage)
      ?.label || "English") as LanguageName;
  }

  return {
    language,
    languageName,
    languages,
    footerContent,
    listeningContent,
    generalContent,
    toDoListContent,
    setLanguageHandle,
  };
});

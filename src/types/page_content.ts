interface ContentValue {
  [key: string]: string
}
export type ContentValueArray = {
  [key: string]: string[]
}

export type Language = 'en' | 'es'
export type LanguageName = 'English' | 'Español'

export interface ToDoListContent {
  noItems: ContentValue
}
export interface GeneralContent {
  save: ContentValue
  close: ContentValue
  warningInfo: ContentValue
}
export interface ListeningContent {
  placeholder: ContentValue
  didntHear: ContentValue
  itemAdded: ContentValue
  itemEdited: ContentValue
  itemDeleted: ContentValue
  listening: ContentValue
  hearing: ContentValue
  didntUnderstand: ContentValue
  cantHear: ContentValue
  itemsLimit: ContentValue
  needToAddItem: ContentValue
}
export interface FooterContent {
  about: ContentValue
  aboutData: ContentValueArray
  commands: ContentValue
  commandsData: ContentValueArray
}
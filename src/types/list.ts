export interface ListItem {
  id: number
  title: string
  completed: boolean
}

export interface NumberMap {
  [key: string]: {
    [key: string]: string | number
  }
}
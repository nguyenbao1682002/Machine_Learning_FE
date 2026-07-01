import type { TFunction } from 'i18next'
interface ISideBarItemGeneric {
  label: string
  translationLabel?: (t: TFunction) => string
  icon?: JSX.Element
  highlightStyle?: 'highlight-only-label' | 'highlight-with-card-style'
  highlightPatterns?: string[]
  showPatterns?: string[]
}

export interface ISideBarItemParent extends ISideBarItemGeneric {
  children: ISideBarItem[]
}

export interface ISideBarItemChildren extends ISideBarItemGeneric {
  path: string
}

export type ISideBarItem = ISideBarItemParent | ISideBarItemChildren

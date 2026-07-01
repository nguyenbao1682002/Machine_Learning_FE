import { matchPath } from 'react-router-dom'
import { ISideBarItem, ISideBarItemChildren, ISideBarItemParent } from '../types'

export function hasAtLeastOneChildMatchedPath(children: ISideBarItem[]): boolean {
  if (Array.isArray(children)) {
    for (const child of children) {
      if ((child as ISideBarItemChildren).path) {
        if (matchPath((child as ISideBarItemChildren).path, location.pathname)) {
          return true
        }
      } else if ((child as ISideBarItemParent).children) {
        if (hasAtLeastOneChildMatchedPath((child as ISideBarItemParent).children ?? [])) {
          return true
        }
      }
    }
  }
  return false
}

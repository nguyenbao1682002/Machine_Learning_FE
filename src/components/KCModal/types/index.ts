export interface KCModalItem {
  content: React.ReactNode
  onClick?: () => void
}

export interface KCModalActions {
  open: () => void
  close: () => void
  toggle: () => void
}

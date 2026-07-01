import React from 'react'
import { KCModalActions } from '../types'

interface KCModalContextProps {
  modalActions: KCModalActions
}

export const KCModalContext = React.createContext<Partial<KCModalContextProps>>({})

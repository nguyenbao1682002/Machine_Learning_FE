import React from 'react'
import { useIsMobile } from '~core/hooks'

export interface ISystemContext {
  isMobile: boolean
}

const CONTEXT_DEFAULT_VALUE: ISystemContext = {
  isMobile: false,
}

const SystemContext = React.createContext<ISystemContext>(CONTEXT_DEFAULT_VALUE)

export const SystemContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const isMobile = useIsMobile()

  const values: ISystemContext = {
    isMobile,
  }

  return <SystemContext.Provider value={values}>{children}</SystemContext.Provider>
}

export default SystemContext

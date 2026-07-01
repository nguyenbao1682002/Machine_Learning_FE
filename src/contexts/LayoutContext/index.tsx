import React from 'react'
import { useIsMobile } from '~core/hooks'

export interface ILayoutContext {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<boolean>
  mainLayoutHeader: React.ReactNode | undefined
  setMainLayoutHeader: React.Dispatch<React.SetStateAction<React.ReactNode | undefined>>
}

const CONTEXT_DEFAULT_VALUE: ILayoutContext = {
  isSidebarOpen: false,
  setIsSidebarOpen: () => false,
  mainLayoutHeader: undefined,
  setMainLayoutHeader: () => <></>,
}

const LayoutContext = React.createContext<ILayoutContext>(CONTEXT_DEFAULT_VALUE)

export const LayoutContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const isMobile = useIsMobile()
  const [mainLayoutHeader, setMainLayoutHeader] = React.useState<React.ReactNode>(CONTEXT_DEFAULT_VALUE.mainLayoutHeader)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(!isMobile)
  // const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false)

  const values: ILayoutContext = {
    mainLayoutHeader,
    setMainLayoutHeader,
    isSidebarOpen,
    setIsSidebarOpen,
  }

  return <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
}

export default LayoutContext

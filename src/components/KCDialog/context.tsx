import React from 'react'

export interface IKCDialogContext {
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<boolean>
}

const CONTEXT_DEFAULT_VALUE: IKCDialogContext = {
  isDialogOpen: false,
  setIsDialogOpen: () => {},
}

const KCDialogContext = React.createContext<IKCDialogContext>(CONTEXT_DEFAULT_VALUE)

export const KCDialogContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const values: IKCDialogContext = {
    isDialogOpen,
    setIsDialogOpen,
  }

  return <KCDialogContext.Provider value={values}>{children}</KCDialogContext.Provider>
}

export default KCDialogContext

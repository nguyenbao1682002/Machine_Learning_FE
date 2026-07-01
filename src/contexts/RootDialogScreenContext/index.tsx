import React from 'react'
import { IDialogScreenOptions } from '~components/KCRootDialogScreen/types'

export type TEffectType = 'none' | 'slide-up' | 'slide-down'

export interface IRootDialogScreenContext {
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  dialogChildren: React.ReactNode
  setDialogChildren: React.Dispatch<React.SetStateAction<React.ReactNode>>
  onClose: () => any
  setOnClose: React.Dispatch<React.SetStateAction<() => any>>
  options: IDialogScreenOptions
  setOptions: React.Dispatch<React.SetStateAction<IDialogScreenOptions>>
}

const DEFAULT_VALUE: IRootDialogScreenContext = {
  isDialogOpen: false,
  setIsDialogOpen: () => {},
  dialogChildren: <></>,
  setDialogChildren: () => {},
  onClose: () => {},
  setOnClose: () => () => {},
  options: {},
  setOptions: () => {},
}

const RootDialogScreenContext = React.createContext<IRootDialogScreenContext>(DEFAULT_VALUE)

export const RootDialogScreenContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(DEFAULT_VALUE.isDialogOpen)
  const [options, setOptions] = React.useState<IDialogScreenOptions>(DEFAULT_VALUE.options)
  const [onClose, setOnClose] = React.useState<() => any>(() => {})
  const [dialogChildren, setDialogChildren] = React.useState<React.ReactNode>(DEFAULT_VALUE.dialogChildren)

  React.useEffect(() => {
    if (isDialogOpen === false && typeof onClose === 'function') {
      onClose()
    }
  }, [isDialogOpen, onClose])

  const exportValues: IRootDialogScreenContext = React.useMemo(
    () => ({
      isDialogOpen,
      setIsDialogOpen,
      dialogChildren,
      setDialogChildren,
      onClose,
      setOnClose,
      options,
      setOptions,
    }),
    [isDialogOpen, setIsDialogOpen, dialogChildren, setDialogChildren, onClose, setOnClose, options, setOptions],
  )

  return <RootDialogScreenContext.Provider value={exportValues}>{children}</RootDialogScreenContext.Provider>
}

export default RootDialogScreenContext

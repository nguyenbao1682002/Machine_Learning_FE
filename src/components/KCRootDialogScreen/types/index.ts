import { SxProps } from '@mui/material'
import { TEffectType } from '~contexts/RootDialogScreenContext'

export interface IDialogScreenOptions {
  fullScreen?: boolean
  effect?: TEffectType
  dialogSx?: SxProps
}

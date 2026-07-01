import { Slide } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { TransitionProps } from '@mui/material/transitions'
import * as lodash from 'lodash'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import RootDialogScreenContext, { TEffectType } from '~contexts/RootDialogScreenContext'
import { useIsMobile } from '~core/hooks'

const TransitionSlideUp = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const TransitionSlideDown = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} />
})

export function KCRootDialogScreen() {
  const { isDialogOpen, setIsDialogOpen, dialogChildren, options } = React.useContext(RootDialogScreenContext)
  const location = useLocation()
  const isMobile = useIsMobile()
  const fullScreen = isMobile || options.fullScreen

  const handleClose = () => {
    setIsDialogOpen(false)
  }

  const transitionProps: { [key in TEffectType]: { TransitionComponent?: any } } = {
    none: {},
    'slide-up': { TransitionComponent: TransitionSlideUp },
    'slide-down': { TransitionComponent: TransitionSlideDown },
  }

  React.useEffect(() => {
    setIsDialogOpen(false)
  }, [location.pathname, setIsDialogOpen])

  return (
    <Dialog
      sx={lodash.merge(
        {
          '& .MuiPaper-root': {
            overflow: fullScreen ? 'auto' : 'hidden',
          },
        },
        options.dialogSx ?? {},
      )}
      fullScreen={fullScreen}
      open={isDialogOpen}
      onClose={handleClose}
      {...transitionProps[options.effect ?? 'none']}
      aria-labelledby='responsive-dialog-title'
      maxWidth={false}
    >
      <div className='flex items-center justify-center'>{dialogChildren}</div>
    </Dialog>
  )
}

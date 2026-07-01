import { Dialog } from '@mui/material'
import React from 'react'
import KCDialogContext, { KCDialogContextProvider } from './context'

interface IKCDialogProps {
  children: React.ReactNode
  dialogContent: React.ReactNode
  dialogContentZIndex: number
}

KCDialog.defaultProps = {
  dialogContentZIndex: 2100,
}

export function KCDialog(props: IKCDialogProps) {
  const DialogRenderElement = React.useCallback(() => {
    const { isDialogOpen, setIsDialogOpen } = React.useContext(KCDialogContext)

    const handleOpen = () => {
      setIsDialogOpen(true)
    }

    const handleClose = () => {
      setIsDialogOpen(false)
    }

    return (
      <div>
        <div onClick={handleOpen} className='cursor-pointer leading-[0]'>
          {props.children}
        </div>
        <Dialog
          open={isDialogOpen}
          onClose={handleClose}
          aria-labelledby='responsive-dialog-title'
          maxWidth={false}
          sx={{
            '&.MuiDrawer-root': {
              zIndex: props.dialogContentZIndex,
            },
          }}
        >
          <div className='flex items-center justify-center overflow-hidden'>{props.dialogContent}</div>
        </Dialog>
      </div>
    )
  }, [])

  return (
    <KCDialogContextProvider>
      <DialogRenderElement />
    </KCDialogContextProvider>
  )
}

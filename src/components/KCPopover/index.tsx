import { Popover, PopoverOrigin } from '@mui/material'
import React from 'react'

interface IKCPopoverProps {
  children: React.ReactNode
  popoverContent: React.ReactNode
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
}

KCPopover.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
}

export function KCPopover(props: IKCPopoverProps) {
  const { anchorOrigin, transformOrigin } = props
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <div onClick={handleClick} className='cursor-pointer leading-[0]'>
        {props.children}
      </div>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose} disableAutoFocus={true} disableEnforceFocus={true} {...{ anchorOrigin, transformOrigin }}>
        {props.popoverContent}
      </Popover>
    </div>
  )
}

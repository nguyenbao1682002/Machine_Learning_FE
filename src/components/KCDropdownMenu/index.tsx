import { ButtonProps, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { KCRootDialogScreenLink } from '../index'

export interface IDropdownMenuItem {
  icon: React.ReactNode
  label: string
  onClick?: () => any
  openDialogScreen?: React.ReactNode
}

type TKCDropdownMenuProps = ButtonProps & {
  dropdownItems: IDropdownMenuItem[]
  children: React.ReactNode
  dropdownContainerStyle?: React.CSSProperties
  zIndex: number
}

KCDropdownMenu.defaultProps = {
  onClick: () => {},
  zIndex: 1800,
}

export function KCDropdownMenu(props: TKCDropdownMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const childrenElement = React.cloneElement((props.children as React.DetailedReactHTMLElement<any, HTMLElement>) ?? <></>, {
    onClick: handleOpen,
  })

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: props.dropdownContainerStyle,
        }}
        sx={{
          '&.MuiPopover-root': {
            zIndex: props.zIndex,
            '& .MuiPaper-root': {
              marginTop: '0.25rem',
            },
          },
        }}
      >
        {props.dropdownItems.map((item, idx) => {
          let MenuItemContent = (
            <MenuItem
              onClick={() => {
                if (typeof item.onClick === 'function') {
                  item.onClick()
                }
                handleClose()
              }}
              className='flex items-center gap-3'
            >
              {item.icon}
              <span className='leading-0'>{item.label}</span>
            </MenuItem>
          )

          if (item.openDialogScreen) {
            MenuItemContent = <KCRootDialogScreenLink renderComponent={item.openDialogScreen}>{MenuItemContent}</KCRootDialogScreenLink>
          }

          return React.cloneElement(MenuItemContent, { key: idx })
        })}
      </Menu>
      {childrenElement}
    </div>
  )
}

import { Drawer } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import * as HiIcons from 'react-icons/hi'

import { KCButton } from '..'

interface IKCDrawerProps {
  anchor: 'top' | 'left' | 'bottom' | 'right'
  children: React.ReactNode
  drawerContent: React.ReactNode
  drawerContentClassName?: React.HTMLAttributes<any>['className']
  zIndex: number
  header?: React.ReactNode
  onOpen: () => void
  onClose: () => void
}

KCDrawer.defaultProps = {
  anchor: 'left',
  children: <KCButton>Click me</KCButton>,
  drawerContent: <div>This is drawer content</div>,
  zIndex: 1500,
  onOpen: () => {},
  onClose: () => {},
}

export function KCDrawer(props: IKCDrawerProps) {
  const [open, setIsOpen] = React.useState(false)
  const handleOnOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.onOpen()
    setIsOpen(true)
    e.stopPropagation()
    e.preventDefault()
  }

  const handleOpenClose = () => {
    props.onClose()
    setIsOpen(false)
  }

  const HeaderElement = React.useMemo(
    () => (
      <div className={classNames('relative flex w-full items-center justify-between border-b-[1px] border-kc-primary px-4 py-2 pr-3 text-kc-highlight')}>
        <div className='text-lg font-semibold'>{props.header ?? 'This is header'}</div>
        <HiIcons.HiOutlineX size={24} className='cursor-pointer' onClick={handleOpenClose} />
      </div>
    ),
    [],
  )

  // React.useEffect(() => {
  //   console.log('Helloooo')
  // }, [])

  return (
    <>
      <div className='leading-[0]' onClick={handleOnOpen}>
        {props.children}
      </div>
      <Drawer
        anchor={props.anchor}
        open={open}
        onClose={handleOpenClose}
        sx={{
          '&.MuiDrawer-root': {
            zIndex: props.zIndex,
          },
        }}
      >
        <div className={classNames(props.drawerContentClassName)}>
          {/* Header */}
          {props.header && HeaderElement}
          <div className='p-4'>{props.drawerContent}</div>
        </div>
      </Drawer>
    </>
  )
}

import { Drawer, Theme, useMediaQuery } from '@mui/material'
import React from 'react'
import * as CgIcons from 'react-icons/cg'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import ESTECLogo from '~assets/images/logo.png'
import { KCStyledLink } from '~components'
import { SIDE_BAR_MENU_WIDTH } from '~layouts/DashboardLayout'
import SideBarItemChildren from './components/SideBarItemChildren'
import SideBarItemParent from './components/SideBarItemParent'
import { sideBarItems } from './configs'
import { ISideBarItem, ISideBarItemChildren, ISideBarItemParent } from './types'

interface ISideBarProps {
  isLeftSideBarOpen: boolean
  setIsLeftSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function SideBar(props: ISideBarProps) {
  const params = useParams()
  const location = useLocation()

  React.useEffect(() => {
    localStorage.setItem('isSideBarOpen', JSON.stringify(props.isLeftSideBarOpen))
  }, [props.isLeftSideBarOpen])

  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'), {
    defaultMatches: true,
    noSsr: false,
  })

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  })

  const generateMenuItems = React.useCallback(
    (items: ISideBarItem[]) => {
      return items.map((sideBarItem) => {
        if (Array.isArray(sideBarItem.showPatterns)) {
          const isMatchedAtLeastOnePattern = sideBarItem.showPatterns.some((pattern) => matchPath(pattern, location.pathname))
          if (isMatchedAtLeastOnePattern === false) {
            return null
          }
        }
        if ((sideBarItem as ISideBarItemParent).children) {
          return (
            <SideBarItemParent key={`sidebar-parent-${(sideBarItem as ISideBarItemChildren).path}`} parent={sideBarItem as ISideBarItemParent}>
              {generateMenuItems((sideBarItem as ISideBarItemParent).children ?? [])}
            </SideBarItemParent>
          )
        } else {
          const sideBarItemChildren = sideBarItem as ISideBarItemChildren
          return <SideBarItemChildren key={`sidebar-child-${sideBarItemChildren.path}`} {...sideBarItemChildren} />
        }
      })
    },
    [params],
  )

  return (
    <Drawer
      anchor='left'
      onClose={() => props.setIsLeftSideBarOpen(false)}
      open={props.isLeftSideBarOpen}
      classes={{ paper: `bg-sidebar text-sidebar__main` }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + (lgUp ? 0 : 100),
      }}
      PaperProps={{ sx: { width: props.isLeftSideBarOpen || lgDown ? SIDE_BAR_MENU_WIDTH : '0rem' } }} // Sidebar width
      variant={lgUp ? 'permanent' : 'temporary'}
    >
      <div className='flex select-none flex-col'>
        <div className='flex items-center justify-between p-4 pt-[14px] text-xl font-semibold'>
          <div className='pl-2'>
            <KCStyledLink to='/' className='flex items-center gap-4 '>
              <img alt='estec-logo' src={ESTECLogo} className='h-14 w-full object-contain' />
            </KCStyledLink>
          </div>
          <CgIcons.CgMenuLeft size={24} className='cursor-pointer' onClick={() => props.setIsLeftSideBarOpen((prev) => !prev)} />
        </div>
        <div className='mt-2'>{generateMenuItems(sideBarItems)}</div>
      </div>
    </Drawer>
  )
}

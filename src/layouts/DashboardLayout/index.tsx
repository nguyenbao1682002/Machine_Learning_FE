import styled from '@emotion/styled'
import { Theme, useMediaQuery } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import { Header, SideBar } from './components'

const SDiv_LayoutContainer = styled.div`
  height: 100vh;
  margin-top: 0rem; // header hight
  background-size: 1920px auto;
  background-repeat: repeat;
`

const SDiv_HeaderContainer = styled.div`
  z-index: 999;
`

export const SIDE_BAR_MENU_WIDTH = '285px'
export const HEADER_HEIGHT = '50px'

interface IDashboardLayoutProps {
  children: React.ReactNode
  headerTitle?: string
  back?: {
    path: string
  }
}

export const DashboardLayout = (props: IDashboardLayoutProps) => {
  const { children, back, headerTitle } = props
  const navigate = useNavigate()

  const [isLeftSideBarOpen, setIsLeftSideBarOpen] = React.useState(
    useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
      defaultMatches: true,
      noSsr: false,
    }),
  )

  return (
    <SDiv_LayoutContainer className='bg-system-theme-image flex'>
      {/* Side bar */}
      <div className={classNames('bg-system-sidebar fixed left-0 top-0 min-h-screen border-r-2 border-gray-200')}>
        <SideBar {...{ isLeftSideBarOpen, setIsLeftSideBarOpen }} />
      </div>

      {/* Header */}
      <SDiv_HeaderContainer
        css={[
          tw`fixed h-[${HEADER_HEIGHT}] w-screen bg-white`,
          isLeftSideBarOpen === true && tw`lg:left-[${SIDE_BAR_MENU_WIDTH}] lg:w-[calc(100vw-${SIDE_BAR_MENU_WIDTH})]`,
          isLeftSideBarOpen === false && tw`left-0 w-screen`,
        ]}
      >
        <Header {...{ isLeftSideBarOpen, setIsLeftSideBarOpen, headerTitle }} />
      </SDiv_HeaderContainer>

      {/* Main content */}
      <div
        css={[
          tw`min-h-screen w-full overflow-y-auto overflow-x-hidden pt-[${HEADER_HEIGHT}]`,
          isLeftSideBarOpen === true && tw`lg:pl-[${SIDE_BAR_MENU_WIDTH}]`,
          isLeftSideBarOpen === false && tw`pl-0`,
        ]}
      >
        {back && (
          <div onClick={() => navigate(back.path)} className='flex cursor-pointer items-center gap-2 px-6 pt-6 text-kc-highlight hover:underline'>
            <FaIcons.FaChevronLeft size={14} />
            <span className='font-semibold'>Back</span>
          </div>
        )}
        {children}
      </div>
    </SDiv_LayoutContainer>
  )
}

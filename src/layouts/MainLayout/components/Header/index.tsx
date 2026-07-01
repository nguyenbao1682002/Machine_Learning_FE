import { Avatar } from '@mui/material'
import React from 'react'
import * as CgIcons from 'react-icons/cg'
import * as BiIcons from 'react-icons/ri'

import ESTECLogo from '~assets/images/logo.png'
import { KCDropdownMenu } from '~components'
import { KCOpenSidebarButton } from '~components/KCRouting'
import AuthContext from '~contexts/AuthContext'
import LayoutContext from '~contexts/LayoutContext'

interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const { isSidebarOpen } = React.useContext(LayoutContext)
  const { logout } = React.useContext(AuthContext)

  return (
    <div className='sticky top-0 z-10 flex h-16 w-full items-center justify-center bg-kc-card px-4 shadow-md'>
      <div className='flex w-full max-w-[80rem] items-center justify-between gap-4'>
        <div>{isSidebarOpen === false && <KCOpenSidebarButton />}</div>

        <div>
          <img alt='estec-logo' src={ESTECLogo} className='h-14 w-full' />
        </div>
        <div>
          <KCDropdownMenu
            dropdownItems={[
              { icon: <CgIcons.CgProfile size={18} />, label: 'Profile' },
              { icon: <BiIcons.RiLogoutCircleLine size={18} />, label: 'Logout', onClick: logout },
            ]}
          >
            <Avatar className='h-10 w-10 cursor-pointer' />
          </KCDropdownMenu>
        </div>
      </div>
    </div>
  )
}

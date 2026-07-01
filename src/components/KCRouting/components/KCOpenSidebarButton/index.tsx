import React from 'react'
import * as HiIcons from 'react-icons/hi'
import { KCIconButton } from '~components'
import LayoutContext from '~contexts/LayoutContext'

interface IKCOpenSidebarButtonProps {}

export default function KCOpenSidebarButton(props: IKCOpenSidebarButtonProps) {
  const { setIsSidebarOpen } = React.useContext(LayoutContext)

  const handleOpenSideBar = () => {
    setIsSidebarOpen(true)
  }

  return (
    <KCIconButton size={9} rounded='full' onClick={handleOpenSideBar}>
      <HiIcons.HiMenuAlt1 size={20} />
    </KCIconButton>
  )
}

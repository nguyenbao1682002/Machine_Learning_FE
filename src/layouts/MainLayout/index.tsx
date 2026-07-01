import React from 'react'
import { SideBar } from './components'

interface IMainLayoutProps {
  children: React.ReactNode
}

export function MainLayout(props: IMainLayoutProps) {
  return (
    <div className='relative flex w-full max-w-[100vw]'>
      <div className='sticky top-0 h-screen max-h-screen w-16 shrink-0 lg:w-64'>
        <SideBar />
      </div>
      <div className='grow'>{props.children}</div>
    </div>
  )
}

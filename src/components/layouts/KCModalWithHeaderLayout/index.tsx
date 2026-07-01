import React from 'react'
import * as Io5Icons from 'react-icons/io5'
import { KCModalContext } from '~components/KCModal/contexts'

interface KCModalWithHeaderLayoutProps {
  children: React.ReactNode
  headerTitle?: React.ReactNode
  bottom?: React.ReactNode
}

export function KCModalWithHeaderLayout(props: KCModalWithHeaderLayoutProps) {
  const { modalActions } = React.useContext(KCModalContext)
  return (
    <div className='flex grow flex-col overflow-hidden text-[0.8rem] sm:text-sm'>
      <div className='flex h-[3rem] shrink-0 select-none items-center justify-between gap-1 border-b border-kc-primary px-4 sm:gap-4'>
        <div className='font-semibold'>{props.headerTitle}</div>
        <div className='clickable mr-[-0.5rem] flex items-center justify-center rounded-full p-1.5' onClick={modalActions?.close}>
          <Io5Icons.IoClose className='text-tertiary cursor-pointer' size={18} />
        </div>
      </div>
      <div className='flex grow flex-col overflow-y-auto'>{props.children}</div>
      {props.bottom && <div className='border-secondary shrink-0 border-t p-4'>{props.bottom}</div>}
    </div>
  )
}

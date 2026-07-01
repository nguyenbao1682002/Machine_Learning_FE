import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as CgIcons from 'react-icons/cg'
import BPLogo from '~assets/images/lg-ha-tien.png'
import ESTECLogo from '~assets/images/logo.png'

interface IHeaderProps {
  isLeftSideBarOpen: boolean
  setIsLeftSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
  headerTitle?: string
}

export function Header(props: IHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className='flex h-full w-full items-center justify-between gap-8 px-4'>
      <div className='flex items-center justify-between gap-3'>
        <div
          className={classNames('flex items-center', {
            'lg:hidden': props.isLeftSideBarOpen,
          })}
        >
          <CgIcons.CgMenuLeft size={24} className='cursor-pointer' onClick={() => props.setIsLeftSideBarOpen((prev) => !prev)} />
        </div>
        <div className='text-lg font-semibold'>{t(props.headerTitle ?? '')}</div>
      </div>
      <div className='flex items-center gap-4'>
        <img alt='estec-logo' src={BPLogo} className='float-right h-8 w-full object-contain' />
        <img alt='estec-logo' src={ESTECLogo} className='float-right h-10 w-full object-contain' />
      </div>
    </div>
  )
}

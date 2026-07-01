import classNames from 'classnames'
import React from 'react'
import * as BsIcons from 'react-icons/bs'
import { matchPath, useLocation } from 'react-router-dom'
import { KCRootDialogScreenLink, KCStyledLink, KCTooltip } from '~components'
import AuthContext from '~contexts/AuthContext'
import LoginPage from '~pages/auth/LoginPage'

interface ISideBarItemProps {
  icon: React.ReactNode
  label: string
  path?: string
  matchedPattern?: string
  requiredLogin?: boolean
  disabled?: boolean
  disabledTooltipTitle?: string
  openRootDialogScreen?: React.ReactNode
}

SideBarItem.defaultProps = {
  requiredLogin: false,
}

export default function SideBarItem(props: ISideBarItemProps) {
  const { isLoggedIn } = React.useContext(AuthContext)
  const location = useLocation()
  const isMatched = (props.matchedPattern || props.path) && matchPath({ path: props.matchedPattern ?? props.path ?? '' }, location.pathname)
  const isDisabledBecauseRequiredLogin = props.requiredLogin && isLoggedIn === false

  let SideBarItemContent = (
    <KCTooltip
      title={(isDisabledBecauseRequiredLogin && 'Please login to see this content') || (props.disabled && props.disabledTooltipTitle)}
      className={classNames(
        'flex items-center gap-1 text-kc-primary lg:px-2',
        { 'text-kc-sub-1': props.disabled || isDisabledBecauseRequiredLogin },
        { 'rounded-kc-primary bg-kc-highlight text-kc-primary-reverse': isMatched },
      )}
    >
      <>
        <div className={classNames('flex h-10 w-10 cursor-pointer items-center justify-center rounded-kc-primary')}>{props.icon}</div>
        <div className={classNames('hidden grow cursor-pointer items-center justify-between font-medium lg:flex')}>
          <span>{props.label}</span>
          {isDisabledBecauseRequiredLogin && <BsIcons.BsPersonFillLock size={16} className='text-kc-highlight' />}
        </div>
      </>
    </KCTooltip>
  )

  if (isDisabledBecauseRequiredLogin) {
    SideBarItemContent = <KCRootDialogScreenLink renderComponent={<LoginPage />}>{SideBarItemContent}</KCRootDialogScreenLink>
  } else if (props.openRootDialogScreen) {
    SideBarItemContent = <KCRootDialogScreenLink renderComponent={props.openRootDialogScreen}>{SideBarItemContent}</KCRootDialogScreenLink>
  } else if (props.path) {
    SideBarItemContent = <KCStyledLink to={props.path}>{SideBarItemContent}</KCStyledLink>
  }

  return <div className='flex  justify-center lg:flex-col'>{SideBarItemContent}</div>
}

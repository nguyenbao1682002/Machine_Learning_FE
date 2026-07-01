import classNames from 'classnames'
import React from 'react'
import { IDialogScreenOptions } from '~components/KCRootDialogScreen/types'
import RootDialogScreenContext from '~contexts/RootDialogScreenContext'

interface IKCRootDialogScreenLinkProps {
  children?: React.ReactNode
  renderComponent?: React.ReactNode
  onClose: () => any
  style: 'normal' | 'link'
  isDisabled: boolean
  className?: string
  options?: IDialogScreenOptions
}

KCRootDialogScreenLink.defaultProps = {
  children: <></>,
  renderComponent: <></>,
  effect: 'none',
  onClose: () => {},
  style: 'link',
  isDisabled: false,
  fullScreen: false,
}

export function KCRootDialogScreenLink(props: IKCRootDialogScreenLinkProps) {
  const { setIsDialogOpen, setDialogChildren, setOnClose, setOptions } = React.useContext(RootDialogScreenContext)

  const handleOnClick = React.useCallback(() => {
    setDialogChildren(props.renderComponent)
    setIsDialogOpen(true)
    setOptions(props.options ?? {})
    setOnClose(() => props.onClose)
  }, [setDialogChildren, props.renderComponent, props.options, setIsDialogOpen, props.onClose, setOnClose])

  return (
    <span
      className={classNames(
        {
          'text-system-highlight hover:cursor-pointer': props.style === 'link',
        },
        props.className,
      )}
      onClick={props.isDisabled ? undefined : handleOnClick}
    >
      {props.children}
    </span>
  )
}

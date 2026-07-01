import classNames from 'classnames'
import React from 'react'
import * as HiIcons from 'react-icons/hi'
import { KCRoundedSpinner } from '~components'
import KCDialogContext from '~components/KCDialog/context'

import RootDialogScreenContext from '~contexts/RootDialogScreenContext'

interface IKCDialogContentContainerProps {
  children?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
  containerClassName?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  error?: React.ReactNode
  type: 'root-dialog' | 'inline-dialog'
}

KCDialogContentContainer.defaultProps = {
  header: undefined,
  children: <></>,
  footer: undefined,
  isLoading: false,
  isError: false,
}

export function KCDialogContentContainer(props: IKCDialogContentContainerProps) {
  const { setIsDialogOpen: setRootDialogOpen } = React.useContext(RootDialogScreenContext)
  const { setIsDialogOpen: setInlineDialogOpen } = React.useContext(KCDialogContext)

  const DefaultHeader = React.useMemo(
    () => (
      <div
        className={classNames(
          'relative flex w-full shrink-0 items-center justify-between border-b-[1px] border-neutral-200 bg-neutral-50 text-kc-highlight',
          props.headerClassName,
        )}
      >
        <div className='p-4 py-6 text-base font-medium leading-[0]'>{props.header}</div>
        <HiIcons.HiOutlineX
          size={24}
          className='mx-3 cursor-pointer'
          onClick={() => {
            if (props.type === 'inline-dialog') {
              setInlineDialogOpen(false)
            } else if (props.type === 'root-dialog') {
              setRootDialogOpen(false)
            }
          }}
        />
      </div>
    ),
    [props.header, props.headerClassName, props.type, setRootDialogOpen, setInlineDialogOpen],
  )

  return (
    <div className={classNames('lg:dialog-screen-lg-size flex flex-col', props.containerClassName)}>
      {/* Header */}
      {props.header && DefaultHeader}
      {/* Body */}
      {props.isLoading && (
        <div className={classNames('flex-1 overflow-auto')}>
          <KCRoundedSpinner expandToFullParent containerClassName='py-16 md:py-0' />
        </div>
      )}
      {!props.isLoading && !props.error && <div className={classNames('flex-1 grow overflow-auto', props.bodyClassName)}>{props.children}</div>}
      {!props.isLoading && props.error && (
        <div className={classNames('flex-1 overflow-auto', { 'flex justify-center py-4 text-red-500': typeof props.error === 'string' }, props.bodyClassName)}>{props.error}</div>
      )}
      {/* Footer */}
      {props.footer && <div className={classNames('shrink-0', props.footerClassName)}>{props.footer}</div>}
    </div>
  )
}

'use client'

import { Modal as MUIModal } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { useApplyDefaultProps } from '~shared/hooks/useApplyDefaultProps'
import { KCModalContext } from './contexts'
import { KCModalActions } from './types'

interface KCModalProps {
  toggleModalOpenButton?: React.ReactNode
  toggleDisabled?: boolean
  size?: 'full-screen' | { width?: string; height?: string; maxWidth?: string; maxHeight?: string; aspectRatio?: number }
  children?: React.ReactNode
  onModalOpen?: () => void
  onModalClose?: () => void
  open?: boolean
}

const defaultProps: Partial<KCModalProps> = {
  size: { width: '30rem', height: '20rem' },
}

export const KCModal = React.forwardRef<KCModalActions, KCModalProps>((props, ref) => {
  props = useApplyDefaultProps(props, defaultProps)
  const isFirstTimeInit = React.useRef(true)

  const [isModalOpen, setIsModalOpen] = React.useState(props.open ?? false)

  const modalActions: KCModalActions = React.useMemo(
    () => ({
      open: () => setIsModalOpen(true),
      close: () => setIsModalOpen(false),
      toggle: () => setIsModalOpen((prev) => !prev),
    }),
    [],
  )

  const getModalSizeStyle = () => {
    if (typeof props.size === 'object') {
      return {
        ...props.size,
      }
    } else {
      return {}
    }
  }

  const handleToggleModalOpen = () => {
    if (!props.toggleDisabled) {
      setIsModalOpen((prev) => !prev)
    }
  }

  const handleToggleModalClose: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsModalOpen((prev) => !prev)
    e.stopPropagation()
  }

  React.useImperativeHandle(
    ref,
    () => {
      return modalActions
    },
    [modalActions],
  )

  React.useEffect(() => {
    if (isFirstTimeInit.current) {
      isFirstTimeInit.current = false
      return
    } else {
      if (isModalOpen) {
        props.onModalOpen?.()
      } else {
        props.onModalClose?.()
      }
    }
  }, [isModalOpen])

  React.useEffect(() => {
    if (props.open !== undefined) {
      setIsModalOpen(props.open)
    }
  }, [props.open])

  return (
    <KCModalContext.Provider value={{ modalActions }}>
      {props.toggleModalOpenButton && (
        <div onClick={handleToggleModalOpen} className='h-full'>
          {props.toggleModalOpenButton}
        </div>
      )}
      <MUIModal open={isModalOpen} onClose={handleToggleModalClose} className='flex items-center justify-center px-3'>
        <div
          className={classNames('flex flex-col overflow-hidden rounded-xl bg-kc-card outline-none', {
            'h-full w-full': props.size === 'full-screen',
            'rounded-lg shadow': props.size !== 'full-screen',
          })}
          style={{ ...getModalSizeStyle() }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex grow flex-col overflow-y-auto overflow-x-hidden text-sm'>{props.children}</div>
        </div>
      </MUIModal>
    </KCModalContext.Provider>
  )
})

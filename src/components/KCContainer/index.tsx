import { HTMLAttributes } from 'react'
import { KCLoading } from '..'

type KCContainerProps = HTMLAttributes<any> & {
  isLoading?: boolean
  renderContentBelowWhenLoading?: boolean
}

export function KCContainer(props: KCContainerProps) {
  const { isLoading, renderContentBelowWhenLoading, children, ...divProps } = props

  const renderContent = () => {
    if (isLoading) {
      const LoadingContent = (
        <div className='flex h-full w-full items-center justify-center'>
          <KCLoading loadingStyle='hash-loader' size={28} />
        </div>
      )
      if (renderContentBelowWhenLoading) {
        return (
          <div className='relative'>
            <div className='opacity-0'>{children}</div>
            <div className='absolute left-0 top-0 h-full w-full'>{LoadingContent}</div>
          </div>
        )
      } else {
        return LoadingContent
      }
    }
    return <>{children}</>
  }

  return <div {...divProps}>{renderContent()}</div>
}

import classNames from 'classnames'
import { KCLoading } from '~components'

interface IKCCardProps {
  className?: React.HTMLAttributes<HTMLDivElement>['className']
  isLoading: boolean
  children: React.ReactNode
  renderContentBehind?: boolean
  error?: React.ReactNode
}

KCCard.defaultProps = {
  isLoading: false,
  children: <></>,
}

export function KCCard(props: IKCCardProps) {
  return (
    <div className={classNames('relative flex h-full w-full flex-col rounded-kc-primary bg-kc-card', props.className)}>
      {(props.isLoading === false || props.renderContentBehind) && (
        <div style={{ opacity: props.renderContentBehind && (props.isLoading || props.error) ? 0 : 'inherit' }}>{props.children}</div>
      )}
      {props.isLoading === true && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
          <KCLoading loadingStyle='hash-loader' size={28} />
        </div>
      )}
      {props.error && <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>{props.error}</div>}
    </div>
  )
}

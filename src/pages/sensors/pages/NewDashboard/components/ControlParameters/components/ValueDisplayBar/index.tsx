import { ClassNames } from '@emotion/react'
import KCSkeleton from '~components/KCSkeleton'

interface ValueDisplayBarProps {
  range: {
    min: number
    max: number
  }
  threshold?: {
    min: number
    max: number
  }
  value?: number
  isLoading?: boolean
}

export function ValueDisplayBar(props: ValueDisplayBarProps) {
  const valuePosition = ((props.value ?? 0) / (props.range.max - props.range.min)) * 100
  const thresholdMinPosition = ((props.threshold?.min ?? 0) / (props.range.max - props.range.min)) * 100
  const thresholdMaxPosition = ((props.threshold?.max ?? 0) / (props.range.max - props.range.min)) * 100

  const classNames = valuePosition > thresholdMaxPosition || valuePosition < thresholdMinPosition ? 'h-full rounded bg-red-600' : 'h-full rounded bg-green-300'

  return (
    <KCSkeleton height={24} width='100%' isRenderingSkeleton={props.isLoading}>
      <div className='relative flex h-6 w-full items-center rounded bg-kc-primary p-[6px]'>
        <div className={classNames} style={{ width: `${valuePosition}%` }}>
          <div
            className='absolute top-0 h-full border-[1px] border-dashed border-b-zinc-950'
            style={{ left: `${thresholdMinPosition}%`, display: thresholdMinPosition ? 'block' : 'none' }}
          />
          <div className='absolute top-0 h-full w-[2px] bg-black' style={{ left: `${thresholdMaxPosition}%`, display: thresholdMaxPosition ? 'block' : 'none' }} />
        </div>
      </div>
    </KCSkeleton>
  )
}

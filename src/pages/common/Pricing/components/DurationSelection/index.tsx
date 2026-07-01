import classNames from 'classnames'
import React from 'react'
import { useQueryParams } from '~shared/hooks/useQueryParams'
import { Duration } from './types'

export function useDurationSelection() {
  const queryParams = useQueryParams()
  const [selectedDuration, setSelectedDuration] = React.useState(queryParams.get('duration') === Duration.Monthly ? Duration.Monthly : Duration.Annually)

  React.useEffect(() => {
    queryParams.set('duration', selectedDuration)
  }, [selectedDuration])

  const DurationSelectionElement = React.useMemo(() => {
    return (
      <div className='flex items-center gap-1 rounded-full border border-solid border-kc-primary p-[3px]'>
        <div
          onClick={() => setSelectedDuration(Duration.Annually)}
          className={classNames('cursor-pointer select-none rounded-full px-2.5 py-1.5 text-sm hover:alpha-5 active:alpha-10', {
            'bg-kc-highlight text-white': selectedDuration === Duration.Annually,
          })}
        >
          Bill annually (15% off)
        </div>
        <div
          onClick={() => setSelectedDuration(Duration.Monthly)}
          className={classNames('cursor-pointer select-none rounded-full px-2.5 py-1.5 text-sm hover:alpha-5 active:alpha-10', {
            'bg-kc-highlight text-white': selectedDuration === Duration.Monthly,
          })}
        >
          Bill monthly
        </div>
      </div>
    )
  }, [selectedDuration])

  return {
    selectedDuration,
    DurationSelectionElement,
  }
}

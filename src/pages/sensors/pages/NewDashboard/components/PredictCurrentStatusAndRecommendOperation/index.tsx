import { useCurrentTime } from '~core/hooks'
import { CurrentStatus_Card, RecommendationActions_Card } from '~pages/sensors/components'
import { ISensorData } from '~shared/types/functions/data'
import { convertToSystemTime } from '~shared/utils'

interface PredictCurrentStatusAndRecommendOperationProps {
  currentSensorData: ISensorData | undefined
  isLoading: boolean
}

export function PredictCurrentStatusAndRecommendOperation(props: PredictCurrentStatusAndRecommendOperationProps) {
  const { currentTime } = useCurrentTime()

  return (
    <div className='flex h-full w-full flex-col gap-4 rounded-lg'>
      <div className='grow'>
        <CurrentStatus_Card currentData={props.currentSensorData} isLoading={props.isLoading} currentTime={convertToSystemTime(currentTime).format('DD MMM YYYY - HH:mm')} />
      </div>
      <div className='grow'>
        <RecommendationActions_Card
          currentData={props.currentSensorData}
          isLoading={props.isLoading}
          currentTime={convertToSystemTime(currentTime).format('DD MMM YYYY - HH:mm')}
        />
      </div>
    </div>
  )
}

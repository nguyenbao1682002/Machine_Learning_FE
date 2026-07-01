import { useTranslation } from 'react-i18next'
import { KCCard } from '~components'
import { ISensorData, useRecommendationActionI18n } from '~shared/types/functions/data'
import { TRecommendationActionKey } from '~translation/types'

interface IPredictionProps {
  currentData: ISensorData | undefined
  isLoading: boolean
  currentTime: string
}

RecommendationActions_Card.defaultProps = {
  isLoading: false,
}

export default function RecommendationActions_Card(props: IPredictionProps) {
  const prediction = props.currentData?.Prediction
  const { t } = useTranslation()
  const recommendationActionI18n = useRecommendationActionI18n()

  const generateCardContent = () => {
    if (prediction && Object.keys(prediction).length > 0) {
      const actions = Object.entries(props.currentData?.Prediction?.RecommendationActions ?? {})
        .filter(([_, value]) => Number(value.toFixed(8)) !== 0)
        .map(([key, value]) => recommendationActionI18n.translate(key as TRecommendationActionKey, value))

      return (
        <>
          <div className='mt-4 text-center font-semibold'>{t('RecommendationActions')?.toUpperCase()}</div>
          <ul className='my-5 flex flex-col justify-center gap-4 pl-8 pr-4'>
            {actions.map((action, idx) => (
              <li key={idx}>{action}</li>
            ))}
          </ul>
        </>
      )
    } else {
      return (
        <>
          <div className='mt-4 text-center font-semibold'>{t('RecommendationActions')?.toUpperCase()}</div>
          <div className='my-5 flex justify-center'>
            <div>{t('NoDataAvailable')}</div>
          </div>
        </>
      )
    }
  }

  return (
    <KCCard isLoading={props.isLoading} className='min-h-[14rem]'>
      {generateCardContent()}
    </KCCard>
  )
}

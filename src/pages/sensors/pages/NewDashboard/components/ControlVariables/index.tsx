import { useTranslation } from 'react-i18next'
import { KCCard } from '~components'
import { ISensorData } from '~shared/types/functions/data'
import { ControlVariablesData } from './data'

interface ControlVariablesProps {
  isLoading: boolean
  currentSensorData: ISensorData | undefined
}

export const ControlVariables = (props: ControlVariablesProps) => {
  const { t } = useTranslation()
  return (
    <KCCard className='min-h-[12rem] text-base' isLoading={props.isLoading}>
      <div className='flex flex-col gap-4 border-b-2 border-kc-primary p-3 pt-[14px]'>
        <div className='line-clamp-1 text-base font-semibold leading-5 text-kc-highlight'>{t('ControlVariables')}</div>
      </div>
      {ControlVariablesData.map((e, idx) => {
        const value = (props.currentSensorData?.SensorData[e.key] ?? 0).toFixed(2)
        return (
          <div key={idx} className='flex gap-4 p-4'>
            <div>- {t(e.label)}:</div>
            <span className='font-semibold text-kc-highlight'>
              {value} {e.unit}
            </span>
          </div>
        )
      })}
    </KCCard>
  )
}

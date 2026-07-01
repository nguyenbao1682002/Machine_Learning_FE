import React from 'react'
import { useTranslation } from 'react-i18next'
import { KCCard } from '~components'
import { DashboardContext } from '../../contexts'
import { WarningItem } from './components/WarningItem'

interface NoteProps {
  isDashboardLoading: boolean
}

export function Note(props: NoteProps) {
  const { t } = useTranslation()
  const { currentSensorData } = React.useContext(DashboardContext)

  return (
    <KCCard isLoading={props.isDashboardLoading} className='h-[14rem]'>
      <div className='mt-3 text-center text-base font-semibold'>{t('ReminderBoard')?.toUpperCase()}</div>

      <div className='mb-4 mt-0.5 flex max-h-[25rem] flex-col gap-4 overflow-y-scroll rounded-md p-4'>
        {(currentSensorData?.Warnings ?? []).map((warning, idx) => (
          <div key={idx}>
            <WarningItem warning={warning} />
          </div>
        ))}
        {!(currentSensorData?.Warnings ?? [])?.length && <div className='flex h-full w-full items-center justify-center'>{t('NoDataAvailable')}</div>}
      </div>
    </KCCard>
  )
}

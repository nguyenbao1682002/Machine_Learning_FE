import dayjs from 'dayjs'
import objectHash from 'object-hash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { KCButton, KCCard, KCModal } from '~components'
import { KCModalActions } from '~components/KCModal/types'
import { KCModalWithHeaderLayout } from '~components/layouts/KCModalWithHeaderLayout'
import { SensorDataIssue } from '~shared/types/functions/data'
import { WarningItem } from './components/WarningItem'
import { WarningModal } from './components/WarningModal'

interface WarningProps {
  sensorDataIssues: SensorDataIssue[]
  isDashboardLoading: boolean
  executeGetCachedLastSensorDataIssues: () => void
}

export function Warning(props: WarningProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const modalRef = React.useRef<KCModalActions>(null)

  const issuesToRender = React.useMemo(() => {
    return props.sensorDataIssues.slice(-1).sort((a, b) => (dayjs(a.SensorDataInfo?.Date ?? a.Date).isBefore(dayjs(b.SensorDataInfo?.Date ?? b.Date)) ? 1 : -1))
  }, [JSON.stringify(props.sensorDataIssues)])

  const handleViewHistoryClick = () => {
    navigate('/factory-sensors/playback-dashboard')
  }

  return (
    <KCCard isLoading={props.isDashboardLoading} className='h-auto'>
      <div className='mt-3 text-center text-base font-semibold'>{t('SystemErrorWarning')?.toUpperCase()}</div>
      {props.sensorDataIssues.length > 0 ? (
        <>
          <div className='m-3 flex flex-col gap-4'>
            {issuesToRender.map((issue) => (
              <WarningItem key={objectHash(issue)} {...{ issue, ...props }} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className='flex size-full items-center justify-center'>{t('NoErrors')}</div>
        </>
      )}
      <div className='mb-1 flex justify-center p-3 pt-1'>
        <KCButton onClick={handleViewHistoryClick} size='small' className='py-1.5'>
          {t('ViewHistory')}
        </KCButton>
      </div>
      <KCModal ref={modalRef} size={{ width: 'min(80rem, calc(100vw - 2rem))', height: 'min(60rem, calc(100vh - 2rem))' }}>
        <KCModalWithHeaderLayout headerTitle={t('ErrorHistory')}>
          <WarningModal closeModal={() => modalRef.current?.close()} {...props} />
        </KCModalWithHeaderLayout>
      </KCModal>
    </KCCard>
  )
}

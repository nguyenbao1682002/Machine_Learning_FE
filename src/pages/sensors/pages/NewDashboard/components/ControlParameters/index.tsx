import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Io5Icons from 'react-icons/io5'
import { KCCard, KCLoading } from '~components'
import KCSkeleton from '~components/KCSkeleton'
import { useGetThreshold } from '~pages/system/OtherSettingsPage/apis/useGetThreshold'
import { useToggleEnableAlert } from '~pages/system/OtherSettingsPage/apis/useToggleEnableAlert'
import { ISensorData } from '~shared/types/functions/data'
import { ValueDisplayBar } from './components'
import { ControlParametersData } from './data'
import { AlertEnableKey, AlertEnableStatus } from './types'

interface ControlParametersProps {
  currentSensorData: ISensorData | undefined
  sensorDataArr: ISensorData[]
  isDashboardLoading: boolean
}

export function ControlParameters(props: ControlParametersProps) {
  const getThreshold = useGetThreshold()
  const { t } = useTranslation()
  const toggleEnableAlert = useToggleEnableAlert()
  const [alertEnableStatus, setAlertEnableStatus] = React.useState<AlertEnableStatus>({})

  const isLoading = getThreshold.isLoading || props.isDashboardLoading

  React.useEffect(() => {
    executeGetThreshold()
  }, [])

  const executeGetThreshold = React.useCallback(() => {
    getThreshold.sendRequest(
      {},
      {
        onSuccess: ({ data }) => {
          const newStatus: AlertEnableStatus = {}
          for (const [key, thresholdConfig] of Object.entries(data)) {
            if (thresholdConfig.enableAlert !== undefined) {
              newStatus[key as AlertEnableKey] = thresholdConfig.enableAlert ? 'ENABLE' : 'DISABLE'
            }
          }
          setAlertEnableStatus(newStatus)
        },
      },
    )
  }, [])

  const handleToggleEnableAlert = (key: AlertEnableKey) => {
    switch (alertEnableStatus[key]) {
      case 'DISABLE': {
        setAlertEnableStatus((prev) => ({ ...prev, [key]: 'ENABLE' }))
        toggleEnableAlert.sendRequest({ key, enableAlert: true }, { onSuccess: () => executeGetThreshold() })
        break
      }
      case 'ENABLE': {
        setAlertEnableStatus((prev) => ({ ...prev, [key]: 'DISABLE' }))
        toggleEnableAlert.sendRequest({ key, enableAlert: false }, { onSuccess: () => executeGetThreshold() })
        break
      }
      case 'UPDATING': {
        break
      }
      default: {
        return
      }
    }
  }

  const renderSpeakerIcon = (key: AlertEnableKey) => {
    switch (alertEnableStatus[key]) {
      case 'DISABLE': {
        return <Io5Icons.IoVolumeMuteSharp onClick={() => handleToggleEnableAlert(key)} className='cursor-pointer' />
      }
      case 'ENABLE': {
        return <Io5Icons.IoVolumeHigh onClick={() => handleToggleEnableAlert(key)} className='cursor-pointer' />
      }
      case 'UPDATING': {
        return (
          <span>
            <KCLoading loadingStyle='rounded-spinner' size={18} />
          </span>
        )
      }
      default: {
        return <></>
      }
    }
  }

  const renderError = () => {
    if (isLoading) {
      return undefined
    } else {
      if (props.currentSensorData) {
        return undefined
      } else {
        return <div>{t('NoDataAvailable')}</div>
      }
    }
  }

  return (
    <KCCard isLoading={isLoading} error={renderError()} renderContentBehind>
      <div className='flex flex-col gap-4 p-4'>
        {ControlParametersData.map((e, idx) => {
          let value = Number(props.currentSensorData?.SensorData[e.key]?.toFixed(2))
          if (value === 0) {
            for (let i = props.sensorDataArr.length - 1; i >= props.sensorDataArr.length - 6; i--) {
              if (props.sensorDataArr[i].SensorData[e.key] && props.sensorDataArr[i].SensorData[e.key] !== 0) {
                value = Number(props.sensorDataArr[i].SensorData[e.key]?.toFixed(2))
                break
              } else {
                value = 0
                continue
              }
            }
          }
          return (
            <div key={idx} className='flex flex-col gap-2'>
              <div className='flex flex-row items-center gap-4 text-base'>
                <div className='line-clamp-1 flex-1 rounded bg-kc-primary p-1 text-center font-semibold'>{t(e.label)}</div>

                <div className='flex w-[8.5rem] items-center justify-center gap-2 rounded bg-kc-primary p-1 text-center font-semibold text-kc-highlight'>
                  <KCSkeleton width='100%' height='100%' isRenderingSkeleton={getThreshold.isLoading && !getThreshold.responseBody}>
                    <span>
                      {value} {e.unit}
                    </span>

                    <div className='flex h-[18px] w-[18px] items-center justify-center'>{renderSpeakerIcon(e.key)}</div>
                  </KCSkeleton>
                </div>
              </div>
              <ValueDisplayBar
                range={e.range}
                threshold={(getThreshold.responseBody ?? {})[e.key]}
                value={Number(value)}
                isLoading={getThreshold.isLoading && !getThreshold.responseBody}
              />
            </div>
          )
        })}
      </div>
    </KCCard>
  )
}

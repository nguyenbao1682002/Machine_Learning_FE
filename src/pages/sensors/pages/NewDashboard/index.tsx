import dayjs from 'dayjs'
import * as lodash from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import useWebSocket from 'react-use-websocket'
import AuthContext from '~contexts/AuthContext'
import { useCurrentTime } from '~core/hooks'
import { SensorDataChart } from '~pages/sensors/components/charts'
import { SensorDataChartVer2 } from '~pages/sensors/components/charts/SensorDataChartV2'
import { WEB_SOCKET_URL } from '~shared/constants'
import { ISensorData, ISensorDataStreamData, SensorDataIssue } from '~shared/types/functions/data'
import { useGetCachedLastSensorDataIssues } from './apis/useGetCachedLastSensorDataIssues'
import { useGetDataForDashboard } from './apis/useGetDataForDashboard'
import { ControlParameters, ControlVariables, Note, PredictCurrentStatusAndRecommendOperation, Warning } from './components'
import { DashboardContext } from './contexts'

export function NewDashboard() {
  const { t } = useTranslation()
  const { logout, loginData } = React.useContext(AuthContext)
  const { currentTime } = useCurrentTime()
  const [sensorDataArr, setSensorDataArr] = React.useState<ISensorData[]>([])
  const getDataForDashboard = useGetDataForDashboard()
  const getCachedLastSensorDataIssues = useGetCachedLastSensorDataIssues()
  const [sensorDataIssues, setSensorDataIssues] = React.useState<SensorDataIssue[]>([])
  const { lastMessage } = useWebSocket(WEB_SOCKET_URL, {
    queryParams: {
      authorization: loginData.token ?? '',
    },

    shouldReconnect: (closeEvent) => {
      if (closeEvent.code === 1006) {
        logout()
        toast.warn('Your session is expired now. Please login again!')
        return false
      }
      return true
    },
    reconnectAttempts: 10,
    //attemptNumber will be 0 the first time it attempts to reconnect, so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds until the maximum number of attempts is reached
    reconnectInterval: (attemptNumber) => Math.min(attemptNumber * 2 * 1000, 10000),
  })

  const addDataToSensorDataArr = React.useCallback((newData: ISensorData[]) => {
    setSensorDataArr((prev) => {
      const newDataArr = [...prev]
      for (const item of newData) {
        if (newDataArr.findIndex((i) => `${i.Date}${i.Time}` === `${item.Date}${item.Time}`) === -1) {
          newDataArr.push(item)

          // Update issues
          if (item.Issues) {
            updateSensorDataIssues(item.Issues)
          }
        }
      }
      // sort by time in ascending order
      newDataArr.sort((a, b) => {
        return dayjs(`${a.Date} ${a.Time}`).isAfter(dayjs(`${b.Date} ${b.Time}`)) ? 1 : -1
      })

      return newDataArr.slice(-120)
    })
  }, [])

  const executeGetCachedLastSensorDataIssues = () => {
    getCachedLastSensorDataIssues.sendRequest(
      {},
      {
        onSuccess: ({ data }) => {
          try {
            const issues: SensorDataIssue[] = data?.Data ? JSON.parse(data.Data) : []
            updateSensorDataIssues(issues)
          } catch (error) {
            console.log({ error })
          }
        },
      },
    )
  }

  React.useEffect(() => {
    executeGetCachedLastSensorDataIssues()
  }, [])

  React.useEffect(() => {
    getDataForDashboard.sendRequest(
      {},
      {
        onSuccess: ({ data }) => {
          if (data && Array.isArray(data)) {
            addDataToSensorDataArr(data)
          }
        },
      },
    )
    getDataForDashboard.responseBody?.map((e) => e)
  }, [])

  React.useEffect(() => {
    if (lastMessage) {
      const streamData: ISensorDataStreamData = JSON.parse(lastMessage.data)
      switch (streamData.type) {
        case 'SENSOR_DATA__LAST_ITEMS': {
          addDataToSensorDataArr(streamData.data)
          break
        }
        default: {
          return
        }
      }
    }
  }, [lastMessage, currentTime.format('mm')])

  const currentSensorData: ISensorData | undefined = React.useMemo(() => {
    return lodash.last(sensorDataArr)
  }, [sensorDataArr, currentTime.format('mm')])

  const chartSensorDataArr = React.useMemo(() => {
    const lastItems = sensorDataArr.slice(-120)
    console.log({ sensorDataArr })
    // Divide into a group of 5 minutes [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], ...]
    const dividedItems = lodash.chunk(lastItems, 5)
    // Get the last item of each group
    return dividedItems.map((group) => lodash.last(group) as ISensorData)
  }, [sensorDataArr])

  const chartPastTrendArr = React.useMemo(() => {
    const dividedItems = lodash.chunk(currentSensorData?.PastTrendData ?? [], 5)
    // Get the last item of each group
    return dividedItems.map((group) => lodash.last(group) as ISensorData['SensorData'])
  }, [currentSensorData])

  const chartPastTrendArrVer2 = React.useMemo(() => {
    const dividedItems = lodash.chunk(currentSensorData?.PastTrendData ?? [], 1)
    // Get the last item of each group
    return dividedItems.map((group) => lodash.last(group) as ISensorData['SensorData'])
  }, [currentSensorData])

  const chartFutureTrendArr = React.useMemo(() => {
    const dividedItems = lodash.chunk(currentSensorData?.Trending ?? [], 5)
    // Get the last item of each group
    return dividedItems.map((group) => lodash.last(group) as ISensorData['SensorData'])
  }, [currentSensorData])

  const updateSensorDataIssues = React.useCallback((newIssues: SensorDataIssue[]) => {
    setSensorDataIssues((prevIssues) => {
      let newIssuesArr = [...prevIssues]
      for (const issue of newIssues) {
        if (newIssuesArr.findIndex((i) => i.ID === issue.ID) === -1) {
          newIssuesArr.push(issue)
        } else {
          // Delete old one and push new one
          newIssuesArr = newIssuesArr.filter((i) => i.ID !== issue.ID)
          newIssuesArr.push(issue)
        }
      }

      // Sort by time
      newIssuesArr.sort((a, b) => (dayjs(a.Date).isBefore(dayjs(b.Date)) ? -1 : 1))

      return newIssuesArr.slice(-10)
    })
  }, [])

  React.useEffect(() => {
    if (currentSensorData) {
      console.log(`Latest ${currentSensorData?.Time}: `, currentSensorData)
    }
  }, [JSON.stringify(currentSensorData)])

  return (
    <DashboardContext.Provider
      value={{ chartSensorDataArr, chartPastTrendArr, chartPastTrendArrVer2, chartFutureTrendArr, currentSensorData, currentTime, isChartLoading: getDataForDashboard.isLoading }}
    >
      <div className='flex flex-col gap-4 p-4'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 xl:col-span-3'>
            <ControlParameters {...{ currentSensorData, sensorDataArr, isDashboardLoading: getDataForDashboard.isLoading }} />
          </div>
          <div className='relative col-span-12 flex flex-col gap-4 xl:col-span-3'>
            <Warning {...{ sensorDataIssues, executeGetCachedLastSensorDataIssues, isDashboardLoading: getDataForDashboard.isLoading }} />
            <Note {...{ isDashboardLoading: getDataForDashboard.isLoading }} />
          </div>

          <div className='col-span-12 xl:col-span-3'>
            <PredictCurrentStatusAndRecommendOperation {...{ currentSensorData, isLoading: getDataForDashboard.isLoading }} />
          </div>
          <div className='relative col-span-12 xl:col-span-3'>
            <div className='flex flex-col gap-4'>
              <SensorDataChart
                title={t('FurnaceLoadWidgetTitle')}
                name={t('FurnaceLoadWidgetTitle')}
                sensorDataKey='KilnDriAmp'
                dataColor='#2b388f'
                predictionColor='#59b1e8'
                pastTrendColor='#adf0c7'
              />
              <SensorDataChartVer2
                title={t('NoxWidgetTitle')}
                name={t('NoxWidgetTitle')}
                sensorDataKey='4G1GA01XAC01_NO_1min'
                dataColor='#2b388f'
                predictionColor='#59b1e8'
                pastTrendColor='#adf0c7'
                sensorDataArr={sensorDataArr}
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 xl:col-span-3'>
            <ControlVariables {...{ currentSensorData }} isLoading={getDataForDashboard.isLoading} />
          </div>
          <div className='col-span-12 xl:col-span-3'>
            <SensorDataChart title='Pyrometer (°C)' name='BZT (Pyrometer)' sensorDataKey='Pyrometer' dataColor='#2b388f' predictionColor='#59b1e8' pastTrendColor='#adf0c7' />
          </div>
          <div className='col-span-12 xl:col-span-3'>
            <SensorDataChart title='BET (°C)' name='BET' sensorDataKey='KilnInletTemp' dataColor='#2b388f' predictionColor='#59b1e8' pastTrendColor='#adf0c7' />
          </div>
          <div className='col-span-12 xl:col-span-3'>
            <SensorDataChartVer2
              title={t('FurnaceOxygenConcentrationWidgetTitle')}
              name={t('FurnaceOxygenConcentrationWidgetTitle')}
              sensorDataKey='4G1GA01XAC01_O2_1min'
              dataColor='#2b388f'
              predictionColor='#59b1e8'
              pastTrendColor='#adf0c7'
              sensorDataArr={sensorDataArr}
            />
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  )
}

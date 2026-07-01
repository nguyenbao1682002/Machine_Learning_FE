import dayjs from 'dayjs'
import lodash from 'lodash'
import React from 'react'
import { KCCard } from '~components'
import { KCEChartsV2, KCEChartsV2Props } from '~components/KCEchartsVer2'
import { DashboardContext } from '~pages/sensors/pages/NewDashboard/contexts'
import { ISensorData } from '~shared/types/functions/data'
// Define properties
interface SensorDataChartVer2Props {
  title: string
  name: string
  sensorDataKey: keyof ISensorData['SensorData']
  dataColor: string
  predictionColor: string
  pastTrendColor: string
  sensorDataArr: ISensorData[]
}

export function SensorDataChartVer2(props: SensorDataChartVer2Props) {
  const { chartSensorDataArr, currentTime, isChartLoading, chartPastTrendArrVer2, chartFutureTrendArr } = React.useContext(DashboardContext)
  const sensorDataArr = props.sensorDataArr.slice(-120)

  const xAxisValues = React.useMemo(() => {
    const result: KCEChartsV2Props['xAxisValues'] = sensorDataArr.map((e) => dayjs(`${e.Date} ${e.Time}`).format('HH:mm'))
    const lastItem = lodash.last(chartSensorDataArr)
    if (lastItem) {
      result.push(dayjs(`${lastItem.Date} ${lastItem.Time}`).add(1, 'minute').format('HH:mm'))
    }

    return result
  }, [sensorDataArr, currentTime.format('HH:mm')])

  const yAxisLines = React.useMemo(() => {
    const result: KCEChartsV2Props['yAxisLines'] = [
      {
        name: props.name,
        color: props.dataColor,
        values: sensorDataArr.map((e) => Number((e.SensorData[props.sensorDataKey] ?? 0).toFixed(2))),
        predictionColor: props.predictionColor,
        predictionValues: chartFutureTrendArr.map((e) => (e[props.sensorDataKey] ? Number((e[props.sensorDataKey] ?? 0).toFixed(2)) : null)),
        pastTrendColor: props.pastTrendColor,
        pastTrendValues: chartPastTrendArrVer2.map((e) => (e[props.sensorDataKey] ? Number((e[props.sensorDataKey] ?? 0).toFixed(2)) : null)),
      },
    ]
    return result
  }, [sensorDataArr, currentTime.format('HH:mm')])

  return (
    <div className='w-full rounded-lg'>
      <KCCard isLoading={isChartLoading} className='min-h-[18rem]'>
        <div className='flex flex-col gap-4 border-b-2 border-kc-primary p-3 pt-[14px]'>
          <div className='line-camp-1 text-base font-semibold leading-5 text-kc-highlight'>{props.title}</div>
        </div>
        <div className='h-full w-full p-2'>
          <KCEChartsV2 {...{ xAxisValues, yAxisLines }} />
        </div>
      </KCCard>
    </div>
  )
}

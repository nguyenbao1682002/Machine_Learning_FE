import dayjs from 'dayjs'
import lodash from 'lodash'
import React from 'react'
import { KCCard, KCECharts, KCEChartsProps } from '~components'
import { DashboardContext } from '~pages/sensors/pages/NewDashboard/contexts'
import { ISensorData } from '~shared/types/functions/data'

interface SensorDataChartProps {
  title: string
  name: string
  sensorDataKey: keyof ISensorData['SensorData']
  dataColor: string
  predictionColor: string
  pastTrendColor: string
}

export function SensorDataChart(props: SensorDataChartProps) {
  const { chartSensorDataArr, currentTime, isChartLoading, chartPastTrendArr, chartFutureTrendArr } = React.useContext(DashboardContext)
  const fixedYAxisRanges: Record<string, { yMin: number; yMax: number }> = {
    'Pyrometer': { yMin: 1000, yMax: 1600 },
    // Thêm các sensorDataKey khác nếu muốn cố định trục Y
  }
  const fixedRange = fixedYAxisRanges[props.sensorDataKey]
  const xAxisValues = React.useMemo(() => {
    const result: KCEChartsProps['xAxisValues'] = chartSensorDataArr.map((e) => dayjs(`${e.Date} ${e.Time}`).format('HH:mm'))

    return result
  }, [chartSensorDataArr, currentTime.format('HH:mm')])

  const yAxisLines = React.useMemo(() => {
    return [
      {
        name: props.name,
        color: props.dataColor,
        values: chartSensorDataArr.map((e) => Number((e.SensorData[props.sensorDataKey] ?? 0).toFixed(2))),
        predictionColor: props.predictionColor,
        predictionValues: chartFutureTrendArr.map((e) => (e[props.sensorDataKey] != null ? Number((e[props.sensorDataKey] ?? 0).toFixed(2)) : null)),
        pastTrendColor: props.pastTrendColor,
        pastTrendValues: chartPastTrendArr.map((e) => (e[props.sensorDataKey] != null ? Number((e[props.sensorDataKey] ?? 0).toFixed(2)) : null)),
      },
    ]
  }, [chartSensorDataArr, chartFutureTrendArr, chartPastTrendArr, props.sensorDataKey])

  return (
    <div className='w-full rounded-lg'>
      <KCCard isLoading={isChartLoading} className='min-h-[18rem]'>
        <div className='flex flex-col gap-4 border-b-2 border-kc-primary p-3 pt-[14px]'>
          <div className='line-clamp-1 text-base font-semibold leading-5 text-kc-highlight'>{props.title}</div>
        </div>
        <div className='h-full w-full p-2'>
        <KCECharts 
                xAxisValues={xAxisValues} 
                yAxisLines={yAxisLines} 
                yMin={fixedRange?.yMin} 
                yMax={fixedRange?.yMax}/>
        </div>
      </KCCard>
    </div>
  )
}

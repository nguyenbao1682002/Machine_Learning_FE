import dayjs from 'dayjs'
import React from 'react'
import { KCCard, KCECharts, KCEChartsProps } from '~components'
import { KC_DEFAULT_TIME_ZONE, NUMBER_MINUTES_OF_TRENDING_PREDICTION } from '~shared/constants'
import { ISensorData } from '~shared/types/functions/data'
import { createArrayFrom1ToN, getTimeOfSensorData } from '~shared/utils'

type ChartOxyProps = {
  isLoading: boolean
  currentTime: dayjs.Dayjs
  sensorDataArr: ISensorData[]
  currentSensorData: ISensorData | undefined
}

export function ChartOxy(props: ChartOxyProps) {
  const sensorDataArr = props.sensorDataArr.slice(-60)

  const xAxisValues = React.useMemo(() => {
    const result: KCEChartsProps['xAxisValues'] = sensorDataArr.map((e) => getTimeOfSensorData(e).format('HH:mm'))
    if (props.currentSensorData) {
      result.push(
        ...createArrayFrom1ToN(NUMBER_MINUTES_OF_TRENDING_PREDICTION).map((idx) =>
          dayjs.tz(`${props.currentSensorData?.Date} ${props.currentSensorData?.Time}`, 'YYYY-MM-DD HH:mm:ss', KC_DEFAULT_TIME_ZONE).add(idx, 'minute').format('HH:mm'),
        ),
      )
    }
    return result
  }, [sensorDataArr, props.currentTime.format('HH:mm')])

  const yAxisLines = React.useMemo(() => {
    const result: KCEChartsProps['yAxisLines'] = [
      {
        name: 'Nồng độ Oxy',
        color: '#2b388f',
        values: sensorDataArr.map((e) => Number((e.SensorData.GA02_Oxi ?? 0).toFixed(2))),
        predictionColor: '#59b1e8',
        predictionValues: props.currentSensorData?.Trending?.map((e) => e?.GA02_Oxi ?? null) || [],
        pastTrendColor: '#adf0c7',
        pastTrendValues: props.currentSensorData?.PastTrendData?.map((e) => e?.GA02_Oxi ?? null) || [],
      },
    ]
    return result
  }, [sensorDataArr])

  return (
    <div className='w-full rounded-lg'>
      <KCCard isLoading={props.isLoading} className='min-h-[12rem]'>
        <div className='flex flex-col gap-4 border-b-2 border-kc-primary p-3 pt-[14px]'>
          <div className='line-clamp-1 text-base font-semibold leading-5 text-kc-highlight'>Nồng độ Oxy đầu lò (%)</div>
        </div>
        <div className='h-full w-full p-2'>
          <KCECharts {...{ xAxisValues, yAxisLines }} />
        </div>
      </KCCard>
    </div>
  )
}

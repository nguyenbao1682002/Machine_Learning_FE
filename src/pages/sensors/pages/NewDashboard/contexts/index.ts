import dayjs from 'dayjs'
import React from 'react'
import { ISensorData } from '~shared/types/functions/data'

interface DashboardContextProps {
  chartSensorDataArr: ISensorData[]
  chartPastTrendArr: Array<ISensorData['SensorData']>
  chartPastTrendArrVer2: Array<ISensorData['SensorData']>
  chartFutureTrendArr: Array<ISensorData['SensorData']>
  currentSensorData: ISensorData | undefined
  currentTime: dayjs.Dayjs
  isChartLoading: boolean
}

export const DashboardContext = React.createContext<DashboardContextProps>({} as DashboardContextProps)

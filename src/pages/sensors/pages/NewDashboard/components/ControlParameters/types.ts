import { ISensorData } from '~shared/types/functions/data'

export type AlertEnableKey = keyof ISensorData['SensorData']
export type AlertEnableStatus = { [key in AlertEnableKey]?: 'ENABLE' | 'DISABLE' | 'UPDATING' }

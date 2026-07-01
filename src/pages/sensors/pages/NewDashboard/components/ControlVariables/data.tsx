import { ISensorData } from '~shared/types/functions/data'

type ControlVariables = {
  label: string
  key: keyof ISensorData['SensorData']
  unit: string
}

export const ControlVariablesData: ControlVariables[] = [
  {
    label: 'SZCoal',
    key: 'CoalSP',
    unit: 't/h',
  },
  {
    label: 'IDFanSpeed',
    key: 'FanSP',
    unit: '%',
  },
  {
    label: 'FurnaceSpeed',
    key: 'FurnaceSpeedSP',
    unit: 'rpm',
  },
]

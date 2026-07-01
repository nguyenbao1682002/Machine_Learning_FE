import { ISensorData } from '~shared/types/functions/data'

export type TStatusKey = keyof ISensorData['SensorData']
export type TStatusValue = 'Increasing' | 'Decreasing' | 'Stable' | 'Unstable'
export type TRecommendationActionKey = keyof ISensorData['SensorData']
export type TRecommendationActionValue = 'Increase' | 'SlightlyIncrease' | 'Decrease' | 'SlightlyDecrease'

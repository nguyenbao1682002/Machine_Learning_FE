import i18n, { TFunction } from 'i18next'
import React from 'react'
import { TRecommendationActionKey } from '~translation/types'

export interface IQuerySensorData {
  Date: string
  Time?: {
    between: [string, string]
  }
  sort?: 'ascending' | 'descending'
  limit?: number
}

export interface IQueryFeedbackList {
  From: string
  To: string
}

export interface IQueryFeedbackItem {
  Date: string
  Hash: string
}

export interface IQueryFeedbackResponse {
  Date: Date | string
  Time: Date | string
  Feedback: null | {
    GeneralStatus?: string
    RecommendationActions?: {
      [key in keyof ISensorData['SensorData']]: {
        Status: string
        ValueChange: string
      }
    }
    StatusInDetails?: {
      [key in keyof ISensorData['SensorData']]?: string
    }
    Note?: string
    User: string
  }
  SensorData: {
    [key in keyof ISensorData['SensorData']]?: number
  }
  FactoryId_Date: string
  FactoryId: string
  Hash: string
}

export interface IStatsFeedback {
  Date: Date | string
  Time: Date | string
  Feedback: null | {
    GeneralStatus?: string
    RecommendationActions?: {
      [key in keyof ISensorData['SensorData']]: {
        Status: string
        ValueChange: string
      }
    }
    StatusInDetails?: {
      [key in keyof ISensorData['SensorData']]?: string
    }
    Note?: string
    User: string
  }
}

export interface IStatsFeedbackResponse {
  message: string
}

export interface SensorDataIssue {
  Date?: string
  Acknowledge?: boolean
  ID?: string
  IssueType?: number
  Rules?: null | []
  Sources?: null | []
  Warning?: string
  SensorDataInfo: {
    FactoryId: ISensorData['FactoryId']
    Date: ISensorData['Date']
    Time: ISensorData['Time']
  }
}

export interface ISensorData {
  Date: string
  Time: string
  FactoryId: string
  SensorData: {
    GA01_Oxi?: number
    GA02_Oxi?: number
    GA03_Oxi?: number
    GA04_Oxi?: number
    KilnDriAmp?: number
    KilnInletTemp?: number
    Nox?: number
    Pyrometer?: number
    CoalSP?: number
    FurnaceSpeedSP?: number
    FanSP?: number
    FurnaceSpeed?: number
    HeatReplaceRatio?: number
    ActualFuelSP?: number
    AlternativeCoalSP?: number
    RecHeadTemp?: number
    TowerOilTemp?: number
    MaterialTowerHeat?: number
    ActualFuel?: number
    AvgBZT?: number
    TotalHeatConsumption?: number
    CaO_f?: number
    S03_hot_meal?: number
    Actual_Feed_Rate_PC?: number
    Actual_Feed_Rate_SZ?: number
    Conveyor_Flow_Rate_01?: number
    Conveyor_Flow_Rate_02?: number
    Temperature_C2?: number
    Kilnhood_Pressure?: number

    '4C1CD01XCC01_Binfilling'?: number
    '4G1PS02PGP01_T8201'?: number
    '4G1PS01GPJ01_T8201I'?: number
    '4G1GA01XAC01_CO'?: number
    '4G1GA02XAC01_A0901'?: number
    '4G1GA03XAC01_A0901'?: number
    '4G1GA04XAC01_A0901'?: number
    '4G1FN01MMS01_T9601'?: number
    '4G1KJ01JST00_B5001'?: number
    '4R1RR01EXD01_T8102'?: number
    '4S1GP02JST00_T8201'?: number
    '4T1AY01JST00_B8702'?: number
    '4R1FN01TVJ01_B5101_INFSC'?: number
    '4R1GQ01HYS01_T8101'?: number

    '4C1BF01FNJ01_M2001_I'?: number
    Grate_Hyd_Pressure?: number
    '4G1GA04XAC01_O2'?: number
    '4K1KP01RST01_T8101'?: number
    '4K1KP01RST01_T8102'?: number
    '4K1KP01RST01_T8103'?: number
    '4K1KP01RST01_T8104'?: number
    '4K1KP01RST02_T8101'?: number
    '4K1KP01RST02_T8102'?: number
    '4K1KP01RST02_T8103'?: number
    '4K1KP01RST02_T8104'?: number
    '4R1FC02TVJ01B5101_INFS'?: number
    '4R1FC06TVJ01B5101_INFS'?: number
    '4E1GP01JST00_T8202'?: number

    '4G1GA03XAC01_O2_1min'?: number
    '4G1GA02XAC01_O2_1min'?: number
    '4G1GA01XAC01_O2_1min'?: number
    '4G1GA01XAC01_NO_1min'?: number
  }
  Prediction: null | {
    GeneralStatus: string
    RecommendationActions: {
      [key in keyof ISensorData['SensorData']]?: number
    }
    StatusInDetails: {
      [key in keyof ISensorData['SensorData']]?: string
    }
  }
  PastTrendData: Partial<ISensorData['SensorData'] | null>[]
  Issues: null | SensorDataIssue[]
  Trending: null | Partial<ISensorData['SensorData'] | null>[]
  Warnings: Warning[]
}

export type Warning = {
  logic: string
  description: string
  target: string
  datetime: string
}

export interface IGetSensorData {
  Date?: string
  Time?: string
}

export interface IUpdateAcknowledge {
  Date?: string
  Time?: string
  ID?: string
}

export interface IGetListOfIssues {
  Date: string
  Time?: {
    between: [string, string]
  }
  sort?: 'ascending' | 'descending'
  limit?: number
}

export interface IUpdateAcknowledgeResponse {
  message: string
  updateData: ISensorData
}

export interface IFactory {
  FactoryId: string // Partition key: F_aBc1D
  ThresholdData: {
    [key in keyof ISensorData['SensorData']]: {
      min: number
      max: number
      enableAlert: boolean
    }
  }
  Description: string
}

export interface ISensorDataFeedback {
  Date: string
  Hash: string
  Time: string
  SensorData: {
    GA01_Oxi?: number
    GA02_Oxi?: number
    GA03_Oxi?: number
    GA04_Oxi?: number
    KilnDriAmp?: number
    KilnInletTemp?: number
    Nox?: number
    Pyrometer?: number
  }
  Prediction: {
    Status: object
    RecommendationActions: object
    Reliability: number
  }
  Feedback: {
    Status: {
      IsGood: boolean
      Suggestions: string[]
      FeedbackDetail: string
    }
    RecommendationActions: {
      IsGood: boolean
      Suggestions: string[]
      FeedbackDetail: string
    }
  }
}
export interface ISensorDataStreamData {
  type: 'SENSOR_DATA__LAST_ITEMS' | 'SENSOR_DATA__FULL_DAY'
  data: ISensorData[]
}

export type IUpdateThreshold = IFactory['ThresholdData']

export interface IUpdateThresholdResponse {
  message: string
  threshold: IFactory['ThresholdData']
}

export type IToggleEnableAlert = {
  key: keyof IFactory['ThresholdData']
  enableAlert: boolean
}

export const unit: { [key in keyof ISensorData['SensorData']]: string } = {
  FanSP: '%',
  CoalSP: 't/h',
  FurnaceSpeedSP: 'rpm',
}

export const recommendationActionVI: { [key in keyof ISensorData['SensorData']]: (value: number) => string } = {
  FanSP: (value) => `${Math.abs(value)} ${unit['FanSP']} tốc độ IDFan`,
  CoalSP: (value) => `${Math.abs(value)} ${unit['CoalSP']} tốc độ Than SZ`,
  FurnaceSpeedSP: (value) => `${Math.abs(value)} ${unit['FurnaceSpeedSP']} tốc độ lò`,
}

export const recommendationActionEN: { [key in keyof ISensorData['SensorData']]: (value: number) => string } = {
  FanSP: (value) => `${Math.abs(value)} ${unit['FanSP']} ID fan speed`,
  CoalSP: (value) => `${Math.abs(value)} ${unit['CoalSP']} SZ coal speed`,
  FurnaceSpeedSP: (value) => `${Math.abs(value)} ${unit['FurnaceSpeedSP']} Furnace speed`,
}

export const generateAction = (params: { t: TFunction<'translation', undefined>; value: number }): string => {
  const action = params.value > 0 ? 'Increase' : 'Decrease'
  return params.t(action)
}

export function useRecommendationActionI18n() {
  const { t, language } = i18n

  const translate = React.useCallback(
    (key: keyof ISensorData['SensorData'], value: number) => {
      const action = value > 0 ? 'Increase' : 'Decrease'
      if (language === 'vi') {
        return `${t(action)} ${recommendationActionVI[key as TRecommendationActionKey]?.(value)}`
      } else {
        return `${t(action)} ${recommendationActionEN[key as TRecommendationActionKey]?.(value)}`
      }
    },
    [language],
  )

  return { translate }
}

export const generateRecommendationActionWithoutMaterial = (params: { t: TFunction<'translation', undefined>; key: keyof ISensorData['SensorData']; value: number }): string => {
  return `${generateAction({ ...params })} ${Math.abs(params.value)} ${unit[params.key]}`
}

export const generateModalInfo = (value: number) => {
  if (value) {
    return value > 0 ? 'Increase' : 'Decrease'
  }
  return ''
}

export interface IQueryDiaryItem {
  pagination?: number
  page_size?: number
  filter: {
    issue_type?: string[] | null
    target?: string[] | null
    startDate?: string
    endDate?: string
  }
}

export interface IQueryDiaryResponse {
  data: {
    datetime_uuid: Date | string
    description: string
    issue_type: string
    target: string
    logic: string
    timestamp: Date | string
  }
}

export interface IRequestPayload {
  action: string
  payload: IQueryDiaryItem
}

// Testing Screen
export type stateData = {
    Pyrometer: number,
    KilnInletTemp: number,
    KilnDriAmp: number,
    GA01_Oxi: number,
    GA02_Oxi: number,
    GA03_Oxi: number,
    CO: number,
    NOx: number
}

export type shapData = {
    Pyrometer: number
    KilnDriAmp: number
    KilnInletTemp: number
    GA01_Oxi: number
    GA02_Oxi: number
    GA03_Oxi: number
}

export type recommendationData = {
    CoalSP: string,
    FanSP: string,
    FurnaceSpeedSP: string,
    wait_min: number,
    reason: string
}

export interface IGetAnomalyDetectData {
  state: stateData
}

export interface IAnomalyDetectResponseData {
  prediction: string
  shap_explains: shapData
}

export interface IGetRecommendControlData {
  state: stateData
}

export interface IRecommendControlResponseData {
  recommendation: recommendationData
}


// Testing playback screen
export interface IPostTestingPlaybackDataResquest {
  state: stateData,
  prediction: string,
  shap_explains: shapData,
  recommendation: recommendationData | null
}

export interface IQueryTestingPlaybackDataResquest {
  end_date: string | null,
  start_date: string | null,
  prediction: string | number | null,
  limit: string | number | null,
}

export interface DataTestingPlaybackItem {
  DateTime: string;
  prediction: string;
  state: stateData;
  shap_explains: shapData;
  recommendation: recommendationData
}

import { useRestAPI } from '~core/hooks'
import { IUpdateThreshold, IUpdateThresholdResponse } from '~shared/types/functions/data'

type TRequestRequiredParams = IUpdateThreshold
type TResponse = IUpdateThresholdResponse

export function useUpdateThreshold() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'threshold__update_data',
    payload: requestRequiredParams,
  }))

  return restAPI
}

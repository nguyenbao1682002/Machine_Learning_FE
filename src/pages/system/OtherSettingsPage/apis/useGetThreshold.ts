import { useRestAPI } from '~core/hooks'
import { IFactory } from '~shared/types/functions/data'

type TRequestRequiredParams = {}
type TResponse = IFactory['ThresholdData']

export function useGetThreshold() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'threshold__get_data',
    payload: requestRequiredParams,
  }))

  return restAPI
}

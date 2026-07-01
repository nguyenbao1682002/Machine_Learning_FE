import { useRestAPI } from '~core/hooks'
import { IGetSensorData, ISensorData } from '~shared/types/functions/data'

type TRequestRequiredParams = IGetSensorData
type TResponse = ISensorData[]

export function useGetAllStats() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'feedback__get_feedback_ticket',
    payload: requestRequiredParams,
  }))

  return restAPI
}

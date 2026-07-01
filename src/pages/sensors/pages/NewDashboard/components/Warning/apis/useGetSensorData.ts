import { useRestAPI } from '~core/hooks'
import { IGetSensorData, ISensorData } from '~shared/types/functions/data'

type TRequestRequiredParams = IGetSensorData
type TResponse = ISensorData

export function useGetSensorData() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'app_db__get_data',
    payload: requestRequiredParams,
  }))

  return restAPI
}

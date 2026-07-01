import { useRestAPI } from '~core/hooks/useRestAPI'
import { IQuerySensorData, ISensorData } from '~shared/types/functions/data'

type TRequestRequiredParams = IQuerySensorData
type TResponse = ISensorData[]

export function useAppDBQueryData() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'app_db__query_data',
    payload: requestRequiredParams,
  }))

  return restAPI
}

import { useRestAPI } from '~core/hooks'
import { ISensorData } from '~shared/types/functions/data'

type TRequestRequiredParams = {}
type TResponse = ISensorData[]

export function useGetDataForDashboard() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'app_db__get_data_for_dashboard',
    payload: requestRequiredParams,
  }))

  return restAPI
}

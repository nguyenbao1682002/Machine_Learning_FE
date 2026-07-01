import { useRestAPI } from '~core/hooks'
import { Cache } from '~shared/types/backend-entities/Cache'
import { CACHE_SORT_KEY } from '~shared/types/backend-entities/Cache/types'

type TRequestRequiredParams = {}
type TResponse = Cache

export function useGetCachedLastSensorDataIssues() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'cache__get_data',
    payload: {
      key: CACHE_SORT_KEY.LAST_SENSOR_DATA_ISSUES,
    },
  }))

  return restAPI
}

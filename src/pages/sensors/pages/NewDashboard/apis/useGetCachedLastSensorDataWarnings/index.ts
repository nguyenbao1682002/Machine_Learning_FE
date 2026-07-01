import React from 'react'
import { useRestAPI } from '~core/hooks'
import { Cache } from '~shared/types/backend-entities/Cache'
import { CACHE_SORT_KEY } from '~shared/types/backend-entities/Cache/types'

type TRequestRequiredParams = {}
type TResponse = Cache

export function useGetCachedLastSensorDataWarnings() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'cache__get_data',
    payload: {
      key: CACHE_SORT_KEY.LAST_SENSOR_DATA_WARNINGS,
    },
  }))

  React.useEffect(() => {
    if (restAPI.responseBody?.Data) {
      try {
        restAPI.responseBody.Data = JSON.parse(restAPI.responseBody.Data)
      } catch (error) {
        console.error('Failed to parse Data:', error)
      }
    }
  }, [restAPI.responseBody])

  return restAPI
}

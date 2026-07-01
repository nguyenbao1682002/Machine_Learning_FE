import { useRestAPI } from '~core/hooks/useRestAPI'
import { ISensorDataFeedback } from '~shared/types/functions/data'

type TRequestRequiredParams = ISensorDataFeedback
type TResponse = boolean

export function useAddFeedback() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'app_db__add_feedback',
    payload: requestRequiredParams,
  }))

  return restAPI
}

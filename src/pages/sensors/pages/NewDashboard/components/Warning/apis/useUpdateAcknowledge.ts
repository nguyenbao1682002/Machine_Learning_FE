import { useRestAPI } from '~core/hooks'
import { IUpdateAcknowledge, IUpdateAcknowledgeResponse } from '~shared/types/functions/data'

type TRequestRequiredParams = IUpdateAcknowledge
type TResponse = IUpdateAcknowledgeResponse

export function useUpdateAcknowledge() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'issue__update_acknowledge',
    payload: requestRequiredParams,
  }))

  return restAPI
}

import { useRestAPI } from '~core/hooks/useRestAPI'
import { IQueryFeedbackList, IQueryFeedbackResponse } from '~shared/types/functions/data'

type TRequestRequiredParams = IQueryFeedbackList
type TResponse = IQueryFeedbackResponse[]

export function useGetFeedbackList() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'feedback_get_list',
    payload: requestRequiredParams,
  }))

  return restAPI
}

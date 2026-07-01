import { useRestAPI } from '~core/hooks/useRestAPI'
import { IQueryFeedbackItem, IQueryFeedbackResponse } from '~shared/types/functions/data'

type TRequestRequiredParams = IQueryFeedbackItem
type TResponse = IQueryFeedbackResponse

export function useGetFeedbackItem() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'feedback_get_item',
    payload: requestRequiredParams,
  }))

  return restAPI
}

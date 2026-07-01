import { useRestAPI } from '~core/hooks'
import { IStatsFeedback, IStatsFeedbackResponse } from '~shared/types/functions/data'

type TRequestRequiredParams = IStatsFeedback
type TResponse = IStatsFeedbackResponse

export function useSaveAllStats() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'feedback__save_feedback',
    payload: requestRequiredParams,
  }))

  return restAPI
}

import { useRestAPI } from '~core/hooks'
import { IToggleEnableAlert } from '~shared/types/functions/data'

type TRequestRequiredParams = IToggleEnableAlert

type TResponse = boolean

export function useToggleEnableAlert() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'threshold__toggle_enable_alert',
    payload: requestRequiredParams,
  }))

  return restAPI
}

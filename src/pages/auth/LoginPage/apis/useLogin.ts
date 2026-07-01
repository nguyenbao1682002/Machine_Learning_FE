import { useRestAPI } from '~core/hooks/useRestAPI'
import { ILogin, ILoginResponse } from '~shared/types/functions/auth'

type TRequestRequiredParams = ILogin
type TResponse = ILoginResponse

export function useLogin() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/auth',
    action: 'login',
    payload: requestRequiredParams,
  }))

  return restAPI
}

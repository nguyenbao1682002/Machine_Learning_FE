import { useRestAPI } from '~core/hooks'
import { IGetListOfIssues, ISensorData } from '~shared/types/functions/data'

type TRequestRequiredParams = IGetListOfIssues
type TResponse = ISensorData['Issues']

export function useGetListOfIssues() {
  const restAPI = useRestAPI<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
    method: 'POST',
    endpoint: '/data',
    action: 'issue_get_list',
    payload: requestRequiredParams,
  }))

  return restAPI
}

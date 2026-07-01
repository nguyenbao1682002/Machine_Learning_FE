import { MutationFunction, useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { IErrorResponseBody } from '~core/types/api.response'
import { BASE_API_URL, LOCAL_STORAGE_THEME_LOGIN_DATA_KEY } from '~shared/constants'
import { TRestAPIEndPoints } from './endpoints'

interface IAPIOptions<TResponse, TTransformedResponse> {
  isDownloadExcel?: boolean
  transformResponseBody?: (data: TResponse) => TTransformedResponse
  axiosConfigs?: AxiosRequestConfig
}

export function useRestAPI<TResponse = any, TRequestRequiredParams = any, TTransformedResponse = TResponse>(
  sendRequestFunction: (requestRequiredParams: TRequestRequiredParams) => TRestAPIEndPoints,
  options: IAPIOptions<TResponse, TTransformedResponse> = {},
) {
  const abortControllerRef = React.useRef<AbortController | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFinishedFirstLoading, setIsFinishedFirstLoading] = useState<boolean>(false)
  const [responseBody, setResponseBody] = useState<TTransformedResponse>()

  React.useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const mutationFunction: MutationFunction<AxiosResponse<TResponse>, TRequestRequiredParams> = React.useCallback((requestRequiredParams) => {
    const sendRequestParams = sendRequestFunction(requestRequiredParams)
    const userData = localStorage.getItem(LOCAL_STORAGE_THEME_LOGIN_DATA_KEY)
    const token = JSON.parse(userData || '{}')?.token
    abortControllerRef.current = new AbortController()

    return axios({
      method: sendRequestParams.method ?? 'GET',
      baseURL: BASE_API_URL,
      url: sendRequestParams.endpoint,
      data: {
        action: sendRequestParams.action,
        payload: sendRequestParams.payload,
      },
      headers: token ? { Authorization: token } : {},
      signal: abortControllerRef.current.signal,
      ...options.axiosConfigs,
    })
  }, [])

  const { mutate, isError, error, isSuccess } = useMutation<AxiosResponse<TResponse>, AxiosError<IErrorResponseBody, any>, TRequestRequiredParams>(mutationFunction, {
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: (response) => {
      setIsLoading(false)
      if (response.data) {
        if (typeof options.transformResponseBody === 'function') {
          setResponseBody(options.transformResponseBody(response.data))
        } else {
          setResponseBody(response.data as any as TTransformedResponse)
        }
      }
    },
    onError: (error) => {
      setIsLoading(false)
    },
    onSettled: () => {
      setIsFinishedFirstLoading(true)
    },
  })

  const clearResponseBody = React.useCallback(() => {
    setResponseBody(undefined)
  }, [])

  return { responseBody, isLoading, sendRequest: mutate, isError, error, isSuccess, clearResponseBody, isFinishedFirstLoading }
}

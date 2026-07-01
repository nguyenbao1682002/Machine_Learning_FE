import { MutationFunction, useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { IErrorResponseBody } from '~core/types/api.response'
import { LOCAL_STORAGE_THEME_LOGIN_DATA_KEY } from '~shared/constants'
import { TCustomRestAPIRequest } from './endpoints'

interface IAPIOptions<TResponse, TTransformedResponse> {
  attachToken?: boolean
  transformResponseBody?: (data: TResponse) => TTransformedResponse
}

export function useCustomRestAPI<TResponse = any, TRequestRequiredParams = any, TTransformedResponse = TResponse>(
  sendRequestFunction: (requestRequiredParams: TRequestRequiredParams) => TCustomRestAPIRequest,
  options: IAPIOptions<TResponse, TTransformedResponse> = {},
) {
  const abortControllerRef = React.useRef<AbortController | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
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

    switch (sendRequestParams.method) {
      case 'GET': {
        return axios({
          url: sendRequestParams.url,
          method: sendRequestParams.method,
          headers: options.attachToken && token ? { Authorization: token } : {},
          signal: abortControllerRef.current.signal,
        })
      }
      case 'POST': {
        return axios({
          url: sendRequestParams.url,
          method: sendRequestParams.method,
          data: JSON.stringify(sendRequestParams.body ?? {}),
          headers: options.attachToken && token ? { Authorization: token } : {},
          signal: abortControllerRef.current.signal,
        })
      }
    }
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
  })

  return { responseBody, isLoading, sendRequest: mutate, isError, error, isSuccess }
}

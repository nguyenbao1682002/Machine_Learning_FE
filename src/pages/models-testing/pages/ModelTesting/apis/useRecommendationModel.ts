import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { useState } from 'react'
import { LOCAL_STORAGE_THEME_LOGIN_DATA_KEY } from '~shared/constants'
import {
  IGetRecommendControlData,
  IRecommendControlResponseData,
} from '~shared/types/functions/data'

const DIARY_API_URL = import.meta.env.VITE_API_URL
const userData = localStorage.getItem(LOCAL_STORAGE_THEME_LOGIN_DATA_KEY)
const token = JSON.parse(userData || '{}')?.token

// ======== AXIOS INSTANCE ========
const axiosInstance = axios.create({
  baseURL: DIARY_API_URL,
  timeout: 180000, // 3 minutes
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
})

type TResponse = IRecommendControlResponseData
type TRequestRequiredParamsAndActions = {
  action: string
  payload: IGetRecommendControlData
}

// ======== HOOK ========
export function useGetRecommendModel() {
  const [responseBody, setResponseBody] = useState<TResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const sendRequest = async (requestParam: TRequestRequiredParamsAndActions) => {
    setLoading(true)
    setError(null)

    try {
      const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: '', // baseURL handled by axiosInstance
        data: requestParam,
      }

      const response = await axiosInstance(requestConfig)
      setResponseBody(response.data)
      return response.data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          console.error('Request timed out (3 minutes)')
        } else {
          console.error(`Axios error: ${err.message}`)
        }
        setError(err)
      } else {
        console.error('Unexpected error', err)
        setError(new AxiosError('An unexpected error occurred'))
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    responseBody,
    loading,
    error,
    sendRequest,
  }
}

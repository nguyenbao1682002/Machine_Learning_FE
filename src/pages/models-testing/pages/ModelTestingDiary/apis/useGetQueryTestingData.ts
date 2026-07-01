import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { useState } from 'react'
import { LOCAL_STORAGE_THEME_LOGIN_DATA_KEY } from '~shared/constants'
import { IQueryTestingPlaybackDataResquest } from '~shared/types/functions/data'

const DIARY_API_URL = import.meta.env.VITE_API_URL
const userData = localStorage.getItem(LOCAL_STORAGE_THEME_LOGIN_DATA_KEY)
const token = JSON.parse(userData || '{}')?.token

const axiosInstance = axios.create({
  baseURL: DIARY_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
})

// type TRequestRequiredParams = IQueryDiaryItem
type TResponse = any
type TRequestRequiredParamsAndActions = {
  action: string
  payload: IQueryTestingPlaybackDataResquest
}

export function useGetQueryTestingData() {
  const [responseBody, setResponseBody] = useState<TResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const sendRequest = async (requestParam: TRequestRequiredParamsAndActions) => {
    setLoading(true)
    setError(null)

    try {
      const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: '',
        data: requestParam,
      }
      const response = await axiosInstance(requestConfig)
      setResponseBody(response.data)
      setLoading(false)
      return response.data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err)
      } else {
        setError(new AxiosError('An unexpected error occurred'))
      }
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

export const HEADERS =
[
    "Thời gian",
    "Trạng thái",
    "Kết quả dự đoán",
    "SHAP values",
    "Đề xuất",
    "Giải thích"
]

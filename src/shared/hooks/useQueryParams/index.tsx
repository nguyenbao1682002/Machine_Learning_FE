import React from 'react'
import { useSearchParams } from 'react-router-dom'

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const get = React.useCallback(
    (key: string) => {
      return searchParams.get(key)
    },
    [searchParams],
  )

  const set = React.useCallback(
    (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(key, value)
      setSearchParams(newSearchParams)
    },
    [searchParams],
  )

  const remove = React.useCallback(
    (key: string) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete(key)
      setSearchParams(newSearchParams)
    },
    [searchParams],
  )

  return { set, get, remove }
}

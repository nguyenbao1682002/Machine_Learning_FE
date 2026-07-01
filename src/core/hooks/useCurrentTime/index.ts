import dayjs from 'dayjs'
import React from 'react'

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = React.useState(dayjs())

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs())
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return { currentTime }
}

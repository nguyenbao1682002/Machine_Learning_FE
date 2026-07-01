import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'
import { KC_DEFAULT_TIME_ZONE } from '~shared/constants'
import { ISensorData } from '~shared/types/functions/data'
import i18n from '~translation/index'

export const isMobileOrTablet = function () {
  const ua = navigator.userAgent
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
}

export const isRequestLoading = (status: 'error' | 'idle' | 'loading' | 'success') => {
  if (status === 'loading') return true
  else return false
}

export const getLastElement = <T>(arr: T[]): T | undefined => {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[arr.length - 1]
  }
  return undefined
}

export function getTimeOfSensorData(data: ISensorData) {
  return dayjs.tz(`${data.Date} ${data.Time}`, KC_DEFAULT_TIME_ZONE)
}

export function getStringTimeOfSensorData(data: ISensorData) {
  return getTimeOfSensorData(data).format('DD MMM YYYY HH:mm:ss')
}

export function convertToSystemTime(time: Dayjs) {
  dayjs.locale(i18n.language)
  return time.tz(KC_DEFAULT_TIME_ZONE)
}

export function randomRGBColor(alpha = 1): string {
  const random = (): number => Math.floor(Math.random() * 256)
  const red = random()
  const green = random()
  const blue = random()

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export function createArrayFrom1ToN(N: number): number[] {
  return Array.from({ length: N }, (_, index) => index + 1)
}

export function getRandomNumberInRange(min: number, max: number): number {
  const randomFraction = Math.random()
  const randomNumberInRange = Math.floor(randomFraction * (max - min + 1) + min)
  return randomNumberInRange
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

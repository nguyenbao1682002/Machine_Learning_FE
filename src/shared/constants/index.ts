export const APP_TITLE = import.meta.env.APP_TITLE ?? 'ESTEC'
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL ?? 'https://kmoon43q69.execute-api.eu-north-1.amazonaws.com/alpha'
export const WEB_SOCKET_URL = import.meta.env.VITE_WEB_SOCKET_URL ?? 'wss://50i5n9hf3e.execute-api.ap-southeast-1.amazonaws.com/alpha'

// export const BASE_API_URL = 'http://dev.api.estec.com:4000/alpha'

// LOCAL STORAGE
export const LOCAL_STORAGE_THEME_LOGIN_DATA_KEY = 'login-data'
export const LOCAL_STORAGE_THEME_CONFIGS_KEY = 'theme-configs'

// DEBUG
export const DEBUG_SHOW_AUTH_CONTEXT_LOG = false

// TIME
export const KC_DEFAULT_TIME_ZONE = 'Asia/Ho_Chi_Minh'
export const DATE_TIME_FORMAT = 'DD MMM YYYY'
export const HHMM_FORMAT = 'HH:mm'
export const HHMMSS_FORMAT = 'HH:mm:ss'
export const DATE_TIME_WITH_HHMM_FORMAT = DATE_TIME_FORMAT + ' ' + HHMM_FORMAT
export const DATE_TIME_WITH_HHMMSS_FORMAT = DATE_TIME_FORMAT + ' ' + HHMMSS_FORMAT

export const NUMBER_MINUTES_OF_TRENDING_PREDICTION = 5

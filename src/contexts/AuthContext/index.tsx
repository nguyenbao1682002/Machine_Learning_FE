import React from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { DEBUG_SHOW_AUTH_CONTEXT_LOG, LOCAL_STORAGE_THEME_LOGIN_DATA_KEY } from '~shared/constants'
import { ILoginResponse } from '~shared/types/functions/auth'

export interface IAuthContext {
  loginData: Partial<ILoginResponse>
  isLoggedIn: boolean
  hasCheckedLoginDataInLSFirstTime: boolean
  login: (data: ILoginResponse) => void
  logout: () => void
}

const CONTEXT_DEFAULT_VALUE: IAuthContext = {
  loginData: {},
  isLoggedIn: false,
  hasCheckedLoginDataInLSFirstTime: false,
  login: () => {},
  logout: () => {},
}

const AuthContext = React.createContext<IAuthContext>(CONTEXT_DEFAULT_VALUE)

export const AuthContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loginData, setLoginData] = React.useState<Partial<ILoginResponse>>(CONTEXT_DEFAULT_VALUE.loginData)
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(CONTEXT_DEFAULT_VALUE.isLoggedIn)
  const [hasCheckedLoginDataInLSFirstTime, setHasCheckedLoginDataInLSFirstTime] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (matchPath('/login', location.pathname) && isLoggedIn === true) {
      navigate({ pathname: '/' }, { replace: true })
    }
  }, [location.pathname, isLoggedIn])

  React.useEffect(() => {
    if (loginData.token) {
      if (hasCheckedLoginDataInLSFirstTime) {
        localStorage.setItem(LOCAL_STORAGE_THEME_LOGIN_DATA_KEY, JSON.stringify(loginData))
      }
      setIsLoggedIn(true)
      DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log('Login successfully')
      DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log(loginData)
    } else {
      setIsLoggedIn(false)
      if (hasCheckedLoginDataInLSFirstTime) {
        localStorage.setItem(LOCAL_STORAGE_THEME_LOGIN_DATA_KEY, JSON.stringify({}))
      }
      DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log('NOT login')
    }
  }, [loginData, setIsLoggedIn, hasCheckedLoginDataInLSFirstTime])

  const login = React.useCallback(
    (data: ILoginResponse) => {
      setLoginData(data)
    },
    [setLoginData],
  )

  const logout = React.useCallback(() => {
    setLoginData({})
  }, [setLoginData])

  const getAndProcessLoginDataFromLocalStorage = React.useCallback(() => {
    DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log('Check loginData in LS')
    const stringLoginData = localStorage.getItem(LOCAL_STORAGE_THEME_LOGIN_DATA_KEY)
    DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log('stringLoginData: ', stringLoginData)
    if (stringLoginData) {
      const loginData: ILoginResponse = JSON.parse(stringLoginData)
      if (loginData.user?.Username) {
        login(loginData)
        setIsLoggedIn(true)
      }
    }
    setHasCheckedLoginDataInLSFirstTime(true)
  }, [login, setHasCheckedLoginDataInLSFirstTime])

  React.useEffect(() => {
    // Check if loginData exist in LocalStorage in the first load time
    getAndProcessLoginDataFromLocalStorage()
  }, [getAndProcessLoginDataFromLocalStorage])

  const values: IAuthContext = React.useMemo(
    () => ({
      loginData,
      isLoggedIn,
      hasCheckedLoginDataInLSFirstTime,
      login,
      logout,
    }),
    [loginData, isLoggedIn, hasCheckedLoginDataInLSFirstTime, login, logout],
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext

import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import AuthContext from '~contexts/AuthContext'
import { EHttpStatusCode } from '~core/enums'

export function KCAxiosInterceptorNavigate() {
  const { logout } = React.useContext(AuthContext)

  React.useEffect(() => {
    const responseInterceptorsId = axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      function (error) {
        switch (error.response?.status) {
          case EHttpStatusCode.UNAUTHORIZED: {
            logout()
            toast.warn('Your session is expired now. Please login again!')
          }
        }
        return Promise.reject(error)
      },
    )

    return () => axios.interceptors.response.eject(responseInterceptorsId)
  }, [logout])

  return <></>
}

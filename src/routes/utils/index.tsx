import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthContext from '~contexts/AuthContext'
import { IRoute } from '../types'

function RequiredLoginPage(props: { children: React.ReactNode }) {
  const { isLoggedIn, hasCheckedLoginDataInLSFirstTime } = React.useContext(AuthContext)

  if (!isLoggedIn) {
    if (hasCheckedLoginDataInLSFirstTime) {
      return <Navigate to='/login/' replace />
    } else {
      return <></>
    }
  } else {
    return <>{props.children}</>
  }
}

export function generateRouteElements(routes: IRoute[]) {
  return (
    <Routes>
      {routes.map((route) => {
        let Element = route.element
        if (route.Layout) {
          Element = <route.Layout {...(route.layoutProps ?? {})}>{Element}</route.Layout>
        }
        if (route.requiredLogin) {
          Element = <RequiredLoginPage>{Element}</RequiredLoginPage>
        }
        return <Route key={route.path} path={route.path} element={Element} />
      })}
    </Routes>
  )
}

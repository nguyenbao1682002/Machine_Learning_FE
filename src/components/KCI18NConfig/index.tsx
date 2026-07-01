import React from 'react'
import { useTranslation } from 'react-i18next'

export function KCI18NConfig() {
  const { i18n } = useTranslation()

  React.useEffect(() => {
    localStorage.setItem('app-language', i18n.language)
  }, [i18n.language])

  return <></>
}

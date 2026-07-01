import React from 'react'
import { LOCAL_STORAGE_THEME_CONFIGS_KEY } from '~shared/constants'
import { AVAILABLE_TO_USE_THEME, TThemeName } from '~styles/theme/configs'
import { THEME_DATA } from '~styles/theme/ts-data'
import { IThemeData } from '~styles/theme/ts-data/types'

export interface IThemeContext {
  themeName: TThemeName
  setThemeName: React.Dispatch<React.SetStateAction<TThemeName>>
  themeData: IThemeData
}

const DEFAULT_THEME: IThemeContext = {
  themeName: 'light-blue',
  setThemeName: () => {},
  themeData: THEME_DATA['light-blue'],
}

const ThemeContext = React.createContext<IThemeContext>(DEFAULT_THEME)

function getThemeNameSavedFromLocalStorage(): TThemeName | undefined {
  const themeConfigs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_THEME_CONFIGS_KEY) ?? '{}')
  if (themeConfigs && themeConfigs?.themeName) {
    if (AVAILABLE_TO_USE_THEME.includes(themeConfigs.themeName)) {
      return themeConfigs.themeName
    }
  }
  return undefined
}

export function getContainerThemeClassName(themeName: string) {
  return `theme-${themeName}`
}

export const ThemeContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [themeName, setThemeName] = React.useState<TThemeName>(getThemeNameSavedFromLocalStorage() ?? DEFAULT_THEME.themeName)

  React.useEffect(() => {
    if (themeName) {
      document.body.className = getContainerThemeClassName(themeName)
      localStorage.setItem(LOCAL_STORAGE_THEME_CONFIGS_KEY, JSON.stringify({ themeName }))
    }
  }, [themeName])

  const themeData = React.useMemo(() => THEME_DATA[themeName], [themeName])

  const values: IThemeContext = React.useMemo(
    () => ({
      themeName,
      setThemeName,
      themeData,
    }),
    [themeName, setThemeName, themeData],
  )

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
}

export default ThemeContext

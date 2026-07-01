import React from 'react'
import { ReactComponent as SVG_ThemeIcon_Blue } from '~assets/color-icons/blue-heart.svg'
import { ReactComponent as SVG_ThemeIcon_Green } from '~assets/color-icons/green-avocado.svg'
import { ReactComponent as SVG_ThemeIcon_Orange } from '~assets/color-icons/orange-fire.svg'
import { ReactComponent as SVG_ThemeIcon_Purple } from '~assets/color-icons/purple-octopus.svg'
import { ReactComponent as SVG_ThemeIcon_Red } from '~assets/color-icons/red-flower.svg'
import { ReactComponent as SVG_ThemeIcon_Yellow } from '~assets/color-icons/yellow-star.svg'
import { TThemeName } from '~styles/theme/configs'

interface ITheme {
  label: string
  contextThemeName: TThemeName
  cssBackgroundImageValue: string
  icon: React.ReactNode
  isAvailable: boolean
}
interface IThemeGroup {
  groupName: string
  items: ITheme[]
}

export const themeGroups: IThemeGroup[] = [
  {
    groupName: 'Dark background',
    items: [
      {
        label: 'Dark blue',
        contextThemeName: 'dark-blue',
        cssBackgroundImageValue: 'rgba(91,112,131,0.4)',
        icon: <SVG_ThemeIcon_Blue />,
        isAvailable: true,
      },
      {
        label: 'Dark green',
        contextThemeName: 'dark-green',
        cssBackgroundImageValue: 'rgba(91,112,131,0.4)',
        icon: <SVG_ThemeIcon_Green />,
        isAvailable: true,
      },
      {
        label: 'Dark orange',
        contextThemeName: 'dark-orange',
        cssBackgroundImageValue: '#ffffff',
        icon: <SVG_ThemeIcon_Orange />,
        isAvailable: true,
      },
      {
        label: 'Dark red',
        contextThemeName: 'dark-red',
        cssBackgroundImageValue: '#ffffff',
        icon: <SVG_ThemeIcon_Red />,
        isAvailable: true,
      },
      {
        label: 'Dark purple',
        contextThemeName: 'dark-purple',
        cssBackgroundImageValue: '#ffffff',
        icon: <SVG_ThemeIcon_Purple />,
        isAvailable: true,
      },
      {
        label: 'Dark yellow',
        contextThemeName: 'dark-yellow',
        cssBackgroundImageValue: '#ffffff',
        icon: <SVG_ThemeIcon_Yellow />,
        isAvailable: true,
      },
    ],
  },

  {
    groupName: 'Light background',
    items: [
      {
        label: 'Light blue',
        contextThemeName: 'light-blue',
        cssBackgroundImageValue: '#ffffff',
        icon: <SVG_ThemeIcon_Blue />,
        isAvailable: false,
      },
      {
        label: 'Light green',
        contextThemeName: 'light-green',
        cssBackgroundImageValue: '#ffffff',
        icon: <SVG_ThemeIcon_Green />,
        isAvailable: false,
      },
      {
        label: 'Light purple',
        contextThemeName: 'light-purple',
        cssBackgroundImageValue: '#ffffff',
        icon: <SVG_ThemeIcon_Purple />,
        isAvailable: false,
      },
    ],
  },
]

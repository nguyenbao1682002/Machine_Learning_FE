import styled from '@emotion/styled'
import { Box } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import * as HiIcons from 'react-icons/hi'
import { KCDialogContentContainer } from '~components'
import ThemeContext, { getContainerThemeClassName } from '~contexts/ThemeContext'
import { themeGroups } from './configs'

const SCheckIcon = styled(HiIcons.HiOutlineCheck)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  padding: 0.125rem;
  border-radius: 999px;
  background-color: var(--kc-highlight);
  color: #fff;
`

export function KCChangeTheme() {
  const { themeName, setThemeName } = React.useContext(ThemeContext)

  return (
    <KCDialogContentContainer header='Theme settings' type='root-dialog' containerClassName='md:max-w-[54rem] md:max-h-[38rem] bg-kc-primary' headerClassName='bg-kc-primary'>
      <div className='flex flex-col gap-8 p-1'>
        {themeGroups.map((themeGroup, idx) => (
          <div key={idx}>
            <div className='text-base font-semibold'>{themeGroup.groupName}</div>
            <div className='mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {themeGroup.items.map((theme, idx) => {
                const isSelectedTheme = themeName === theme.contextThemeName
                return (
                  <div key={idx}>
                    <Box
                      className={classNames(
                        'relative col-span-1 aspect-[16/10.5] cursor-pointer rounded-kc-primary bg-cover bg-no-repeat',
                        getContainerThemeClassName(theme.contextThemeName),
                        { 'theme-available': theme.isAvailable, 'theme-not-available': !theme.isAvailable },
                      )}
                      sx={{
                        background: 'var(--bg-kc-card)',
                        '&.theme-available:hover': {
                          background: 'var(--kc-hover-highlight)',
                        },
                        border: isSelectedTheme ? 'solid 2px var(--kc-highlight)' : 'solid 2px #68686868',
                      }}
                      onClick={() => {
                        if (theme.isAvailable === true) {
                          setThemeName(theme.contextThemeName)
                        }
                      }}
                    >
                      {isSelectedTheme && <SCheckIcon />}
                      <div className='flex flex-col p-3'>
                        <div className='h-6 w-6'>{theme.icon}</div>
                        <div className='mt-2 flex gap-1 text-kc-primary'>
                          <span>Normal</span>
                          <span className='font-semibold'>Bold</span>
                        </div>
                        <div className='flex gap-1 text-kc-highlight'>
                          <span>Normal</span>
                          <span className='font-semibold'>Bold</span>
                        </div>
                      </div>
                      {theme.isAvailable === false && (
                        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-kc-primary bg-kc-alpha-80 font-semibold text-black opacity-0 duration-200 hover:opacity-100'>
                          Available soon
                        </div>
                      )}
                    </Box>
                    <div className='mt-2 text-sm text-kc-primary'>{theme.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </KCDialogContentContainer>
  )
}

import { createTheme } from '@mui/material/styles'
import React from 'react'
import ThemeContext from '~contexts/ThemeContext'

export const getMuiTheme = () => {
  const { themeData } = React.useContext(ThemeContext)

  const theme = React.useMemo(() => {
    return createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        },
      },

      typography: {
        fontFamily: '-apple-system, "system-ui", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        button: {
          textTransform: 'none',
        },
      },

      colorSchemes: {
        light: {
          palette: {
            primary: {
              light: themeData['kc-highlight'],
              main: themeData['kc-highlight'],
              dark: themeData['kc-highlight'],
              contrastText: '#fff',
            },
            text: {
              primary: themeData['kc-primary'],
              secondary: 'var(--text-kc-sub-1)',
            },
          },
        },
        dark: {
          palette: {
            text: {
              primary: themeData['kc-primary'],
              secondary: 'var(--text-kc-sub-1)',
            },
          },
        },
      },

      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: 'var(--bg-kc-paper)',
              borderRadius: 'var(--rounded-kc-primary)',
            },
          },
        },
        MuiList: {
          styleOverrides: {
            root: {
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              '&': {
                color: 'var(--text-kc-primary-reverse)',
                backgroundColor: 'var(--kc-highlight)',
                '&:hover': {
                  backgroundColor: 'var(--kc-highlight)',
                },
              },
              '&.MuiButton-outlined': {
                color: themeData['kc-primary'],
                borderColor: 'transparent',
                backgroundColor: 'var(--bg-kc-card)',
              },
              '&:disabled': {
                backgroundColor: 'var(--kc-disabled)',
                color: 'var(--text-kc-sub-1)',
              },
              borderRadius: 'var(--rounded-kc-primary)',
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              backgroundColor: 'var(--bg-kc-input)',
              borderRadius: 'var(--rounded-kc-primary) !important',
            },
            input: {
              backgroundColor: 'var(--bg-kc-input)',
              '&:focus': {
                outline: 'none',
              },
              borderRadius: 'var(--rounded-kc-primary)',
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              color: 'var(--kc-primary)',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--kc-secondary)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--kc-highlight)',
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderRadius: 'var(--rounded-kc-primary)',
              },
              '&.Mui-disabled': {
                background: '#F0F1F2',
                '& input.MuiOutlinedInput-input': {
                  // background: '#F0F1F2',
                  borderRadius: '10px',
                  WebkitTextFillColor: '#ACB0B9',
                },
              },
            },
            notchedOutline: {
              //set default border color here
              display: 'none',
            },
            input: {
              '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 10rem white inset',
              },
              '&::placeholder': {
                color: 'var(--text-system-placeholder)',
                opacity: 1,
              },
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            popper: {
              '&.MuiTooltip-popper div.MuiTooltip-tooltip': {
                margin: '0',
              },
            },
          },
          defaultProps: {
            arrow: true,
            placement: 'top',
          },
        },
        MuiSelect: {
          styleOverrides: {
            select: {
              borderRadius: '0.5rem',
            },
          },
        },
      },
    })
  }, [themeData])

  return theme
}

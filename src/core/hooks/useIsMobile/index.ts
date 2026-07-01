import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export function useIsMobile() {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down(1024))
}

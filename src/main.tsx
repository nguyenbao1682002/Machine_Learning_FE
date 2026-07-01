import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AppContextProvider from './contexts'
import './translation'

// Vime
import { StyledEngineProvider } from '@mui/material'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@vime/core/themes/default.css'
import '@vime/core/themes/light.css'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import minMax from 'dayjs/plugin/minMax'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { KC_DEFAULT_TIME_ZONE } from '~shared/constants'

// Create a client
const queryClient = new QueryClient({ queryCache: new QueryCache({}) })

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.extend(minMax)
dayjs.extend(isBetween)

dayjs.tz.setDefault(KC_DEFAULT_TIME_ZONE)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </>,
)

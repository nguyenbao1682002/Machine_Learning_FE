// MUI
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { getMuiTheme } from '~styles/mui/configs'
// React-Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Project
import { KCAxiosInterceptorNavigate, KCI18NConfig, KCRootDialogScreen } from './components'
import { routesElm } from './routes'

import '~styles/index.css'
import '~styles/theme/index.ts'

const root = document.querySelector(':root') as HTMLElement
function myFunction_set() {
  root.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', myFunction_set)

function App() {
  return (
    <>
      <KCAxiosInterceptorNavigate />
      <CssVarsProvider theme={getMuiTheme()}>
        <div>{routesElm}</div>
        <KCRootDialogScreen />
        <ToastContainer autoClose={1500} />
        <KCI18NConfig />
      </CssVarsProvider>
    </>
  )
}

export default App

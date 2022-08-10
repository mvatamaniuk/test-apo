import { LocalizationProvider } from '@mui/x-date-pickers'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ThemeProvider } from '@mui/material/styles'

import App from './App'

import store from './redux/store.redux'
import { theme } from './theme/theme.main'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)

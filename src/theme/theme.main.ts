import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#003367',
    },
  },
})

theme.typography = {
  ...theme.typography,
  h1: {
    fontSize: 24,
    fontWeight: 500,
    letterSpacing: 0.35,
    color: theme.palette.primary.main,
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: 0.25,
  },
}

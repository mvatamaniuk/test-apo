import { FC } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'

import { useAuth } from '../../hooks/auth/useAuth'

export const SignIn: FC = () => {
  const { onSendCodeWithEmailSubmit, loginError } = useAuth()

  return (
    <Box
      component='form'
      onSubmit={onSendCodeWithEmailSubmit}
      sx={{ width: 350, margin: '0 auto' }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h1'>Login</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            error={!!loginError}
            sx={{ mt: 3 }}
            fullWidth
            name='email'
            label='Enter your email'
            variant='standard'
          />
        </Grid>

        <Grid item xs={4} />

        <Grid item xs={8} sx={{ textAlign: 'end' }}>
          <Button variant='contained' type='submit' sx={{ mt: 3 }}>
            Send code
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

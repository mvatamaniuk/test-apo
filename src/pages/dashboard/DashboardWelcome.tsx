import { Button, Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import bgimg from '../../assets/images/bg-image.png'
import { useAuth } from '../../hooks/auth/useAuth'

export const DashboardWelcome: FC = () => {
  const { logout } = useAuth()

  const navigate = useNavigate()

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <img src={bgimg} alt='' style={{ width: 300, height: 300 }} />
      </Grid>

      <Grid xs={12} sx={{ textAlign: 'center', mb: 3 }}>
        <Typography>Coming soon</Typography>
      </Grid>

      <Grid xs={12} sx={{ textAlign: 'center' }}>
        <Button variant='contained' onClick={() => navigate('/dashboard')}>
          Edit my profile and my worklog
        </Button>
      </Grid>

      <Grid xs={12} sx={{ textAlign: 'center', mt: 3 }}>
        <Button onClick={logout}>Logout</Button>
      </Grid>
    </Grid>
  )
}

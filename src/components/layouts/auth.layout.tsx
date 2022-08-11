import { Grid } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { useAppSelector } from '../../hooks/redux/useRedux'
import { selectGlobal } from '../../redux/global/global.selectors'

import bgImage from '../../assets/images/bg-image.png'

export const AuthLayout: FC = () => {
  const { metaDescription } = useAppSelector(selectGlobal)

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={6}
        sx={{
          background: 'silver',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={bgImage} alt='' style={{ width: 400, height: 400 }} />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Outlet />
      </Grid>

      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          textAlign: 'center',
          width: '100%',
        }}
      >
        {metaDescription}
      </footer>
    </Grid>
  )
}

import { Box, Grid, Typography, TextField, Button, Alert } from '@mui/material'
import { ChangeEvent, createRef, FC } from 'react'

import { useAuth } from '../../hooks/auth/useAuth'

const INPUTS = [0, 1, 2, 3, 4, 5]

export const CodeVerification: FC = () => {
  const ref = createRef<HTMLDivElement>()

  const { onLoginWithEmailSubmit, codeError } = useAuth()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target

    const [fieldName, fieldIndex] = name.split('-')

    let fieldIntIndex = parseInt(fieldIndex, 10)

    const nextField = document.querySelector<HTMLInputElement>(
      `input[name=field-${fieldIntIndex + 1}]`
    )

    if (nextField) {
      nextField.focus()
    }
  }

  return (
    <Box
      component='form'
      onSubmit={onLoginWithEmailSubmit}
      sx={{ width: 370, margin: '0 auto' }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h1'>Login</Typography>
        </Grid>

        {codeError && (
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Alert severity='error'>Please enter valid code!</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Box sx={{ my: 3 }}>
            <Typography variant='subtitle1'>
              To finalize your verification, please enter the code that has been
              sent to your email address / SMS
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ mb: 3 }}>
          {INPUTS.map((inputVal) => {
            return (
              <TextField
                error={codeError}
                onChange={onChange}
                inputProps={{ maxLength: 1 }}
                key={inputVal}
                ref={ref}
                name={`field-${inputVal}`}
                label=''
                variant='standard'
                sx={{ width: 50, mr: 1 }}
              />
            )
          })}
        </Grid>

        <Grid item xs={8} />

        <Grid item xs={4}>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </Grid>

        <Grid item xs={12} sx={{ my: 3 }}>
          <Typography
            variant='subtitle1'
            sx={{ color: 'silver', fontSize: 12 }}
          >
            If you do not receive the confirmation message within a few minutes,
            please check your Spam or Bulk E-Mail folder
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

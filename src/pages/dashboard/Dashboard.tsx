import { ChangeEvent, FC, useCallback, useState } from 'react'
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  debounce,
  Stack,
  Button,
  Box,
} from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

import { useGetCurrentUserQuery } from '../../api/account/account.api'
import { usePatchUserCrmProfileMutation } from '../../api/account/user-crm.api'
import { useWorkLog } from '../../hooks/work-log/useWorkLog'

export const Dashboard: FC = () => {
  const [value, setValue] = useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)

  const { data, isLoading } = useGetCurrentUserQuery()
  const [patchUser] = usePatchUserCrmProfileMutation()
  const { updateWorkLog, workLog } = useWorkLog()

  const handleChange = async (newValue: Date | null, path: string) => {
    setValue(newValue)

    await patchUser({
      id: 'd518afb0-77ea-4559-bec2-296a424b30fc',
      value: newValue,
      path,
    })
  }

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    await patchUser({
      value,
      id: 'd518afb0-77ea-4559-bec2-296a424b30fc',
      path: name,
      op: '',
      from: '',
      operationType: 0,
    })
  }

  const debounceHandler = useCallback(debounce(onChange, 500), [])

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <Box sx={{ mx: 5 }}>
        <Typography variant='h1'>General</Typography>
      </Box>

      <Grid container sx={{ mx: 5, my: 5 }}>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                onChange={debounceHandler}
                variant='standard'
                name='firstName'
                label='First name'
                defaultValue={data?.firstName}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={debounceHandler}
                variant='standard'
                name='lastName'
                label='Last name'
                defaultValue={data?.lastName}
              />
            </Grid>
            <Grid item xs={4}>
              <DesktopDatePicker
                label='Date of birth'
                inputFormat='MM/dd/yyyy'
                value={value}
                onChange={(event) => handleChange(event, 'birthDate')}
                renderInput={(params) => (
                  <TextField {...params} variant='standard' />
                )}
              />
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 5 }}>
            <Grid item xs={4}>
              <TextField
                variant='standard'
                label='Email'
                name='email'
                defaultValue={data?.email}
                onChange={debounceHandler}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant='standard'
                label='Personal email'
                name='personalEmail'
                defaultValue={data?.personalEmail}
                onChange={debounceHandler}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant='standard'
                label='Phone number'
                name='mobilePhone'
                defaultValue={data?.mobilePhone}
                onChange={debounceHandler}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <DesktopDatePicker
                label='Start Date'
                inputFormat='MM/dd/yyyy'
                value={value}
                onChange={(value) => handleChange(value, 'startDate')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    name='dateDesktop'
                    onChange={debounceHandler}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant='standard'
                label='Absences'
                defaultValue={data?.absences}
                onChange={debounceHandler}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    name='isCoreTeamMember'
                    onChange={debounceHandler}
                  />
                }
                label='Core team member'
                checked={data?.isCoreTeamMember}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12}>
            <TextField
              variant='standard'
              label='Slack'
              defaultValue={data?.slackUserName}
              onChange={debounceHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='standard'
              label='Github'
              defaultValue={data?.gitHubUserName}
              onChange={debounceHandler}
            />
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mx: 5 }}>
        <Typography variant='h1'>Work Logs</Typography>
      </Box>

      <Grid container sx={{ mt: 15, mx: 5 }}>
        {workLog.map((_worklog) => {
          return (
            <Grid item xs={2} key={_worklog.day}>
              <Typography>{_worklog.day}</Typography>

              <Stack direction='row'>
                {_worklog.logs.map((log: any) => {
                  return (
                    <>
                      <TimePicker
                        label='Start Date'
                        onChange={() => {}}
                        value={log.startDate!}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant='standard'
                            sx={{ width: 100 }}
                          />
                        )}
                      />

                      <TimePicker
                        label='End Date'
                        onChange={() => {}}
                        value={log.endDate!}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant='standard'
                            sx={{ width: 100 }}
                          />
                        )}
                      />
                    </>
                  )
                })}
              </Stack>

              <Button
                onClick={() =>
                  updateWorkLog(_worklog.day, startTime!, endTime!)
                }
              >
                Add
              </Button>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

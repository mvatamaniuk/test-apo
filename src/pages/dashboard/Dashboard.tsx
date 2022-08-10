import { FC, useCallback, useState } from 'react'
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  debounce,
  Stack,
  Button,
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
  const [dateStore, setDateStore] = useState<Array<any>>([])

  // const [updateValue, setUpdateVa]

  const { data, isLoading } = useGetCurrentUserQuery()
  const [patchUser] = usePatchUserCrmProfileMutation()
  const { updateWorkLog, workLog } = useWorkLog()

  // const {} = useDebounce()

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  const onChange = async (value: string) => {
    // console.log('API CALL')
    await patchUser({
      value,
      id: 'd518afb0-77ea-4559-bec2-296a424b30fc',
      path: 'firstName',
      op: '',
      from: '',
      operationType: 0,
    })
  }

  const debounceHandler = useCallback(debounce(onChange, 500), [])

  // const handleStartChangeDate = (newValue: Date | null) => {
  //   setStartTime(newValue)
  // }

  // const handleEndChangeDate = (newValue: Date | null) => {
  //   setEndTime(newValue)
  // }

  // const handleWorkTimeClick = () => {
  //   updateWorkLog('monday', startTime!, endTime!)
  // }

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <Grid container sx={{ mx: 5, my: 5 }}>
        <Grid item xs={8}>
          <Grid container sx={{ bgcolor: '' }}>
            <Grid item xs={4} sx={{ bgcolor: '' }}>
              <TextField
                onChange={(event) => debounceHandler(event.target.value)}
                variant='standard'
                label='First name'
                defaultValue={data?.firstName}
              />
            </Grid>
            <Grid item xs={4} sx={{ bgcolor: '' }}>
              <TextField
                onChange={(event) => debounceHandler(event.target.value)}
                variant='standard'
                label='Last name'
                defaultValue={data?.lastName}
              />
            </Grid>
            <Grid item xs={4}>
              <DesktopDatePicker
                label='Date desktop'
                inputFormat='MM/dd/yyyy'
                value={value}
                onChange={handleChange}
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
                defaultValue={data?.email}
                onChange={(event) => debounceHandler(event.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant='standard'
                label='Personal email'
                defaultValue={data?.personalEmail}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant='standard'
                label='Phone number'
                defaultValue={data?.mobilePhone}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <DesktopDatePicker
                label='Date desktop'
                inputFormat='MM/dd/yyyy'
                value={value}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField {...params} variant='standard' />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant='standard'
                label='Absences'
                defaultValue={data?.absences}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='standard'
              label='Github'
              defaultValue={data?.gitHubUserName}
            />
          </Grid>
        </Grid>
      </Grid>

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

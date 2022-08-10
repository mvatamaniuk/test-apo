import moment from 'moment'
import { useCallback, useState } from 'react'

type Day = string
type WorkLog = Array<IDayLog>

interface IDayLog {
  day: string
  isActive: boolean
  logs: Array<IDateLog> | Array<never>
}

interface IDateLog {
  startTime: Date | null
  endTime: Date | null
}

const WORK_LOG = [
  {
    isActive: false,
    day: 'Sunday',
    logs: [],
  },
  {
    isActive: false,
    day: 'Monday',
    logs: [],
  },
  {
    isActive: false,
    day: 'Tuesday',
    logs: [],
  },
  {
    isActive: false,
    day: 'Wednesday',
    logs: [],
  },
  {
    isActive: false,
    day: 'Thursday',
    logs: [],
  },
  {
    isActive: false,
    day: 'Friday',
    logs: [],
  },
]

export const useWorkLog = () => {
  const [workLog, setWorkLog] = useState<WorkLog>(WORK_LOG)

  const addEmptyLog = (day: Day) => (workLog: WorkLog) => {
    console.log('day', day)
    console.log('work log', workLog)

    return workLog.map((value) => {
      if (value.day === day) {
        return {
          ...value,
          //@ts-ignore
          logs: value.logs.concat({ startTime: null, endTime: null }),
        }
      }

      return value
    })
  }

  const updateWorkLog = useCallback(
    (day: Day, startTime: Date, endTime: Date) => {
      const isStartTimeAfterEnd = moment(endTime).isSameOrAfter(startTime)

      const logByDay = workLog.find((log) => log.day === day)

      const lastWorkLogTime = logByDay?.logs.at(-1)

      // console.log('last', lastWorkLogTime)

      // if (!lastWorkLogTime?.startTime === null) {
      //   return alert('fill')
      // }

      // if (!startTime) {
      //   return setWorkLog(addEmptyLog(day))
      // }

      if (!isStartTimeAfterEnd) return alert('Wrong time')

      if (lastWorkLogTime) {
        const lastStartTime = (lastWorkLogTime as IDateLog).startTime

        const isTimeIntersecting = moment(lastStartTime).isBetween(
          startTime,
          endTime
        )

        if (isTimeIntersecting) return alert('Time intersectiong')

        // console.log('IS INTERSECTING', isTimeIntersecting)
      }

      const newWorkLog = workLog.map((log) => {
        if (log.day === day) {
          return {
            ...log,
            //@ts-ignore
            logs: log.logs.concat({ startTime, endTime }),
          }
        }

        return log
      })

      setWorkLog(newWorkLog)

      console.log('new ', newWorkLog)
    },
    [workLog]
  )

  return {
    workLog,
    updateWorkLog,
  }
}

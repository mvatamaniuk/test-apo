import { useEffect, useState } from 'react'

import {
  ACCESS_TOKEN_STORAGE,
  REFRESH_TOKEN_STORAGE,
} from '../../constants/storage/storage.constants'
import { selectAccessToken } from '../../redux/auth/auth.selectors'

import { setAccessToken } from '../../redux/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '../redux/useRedux'

export const useToken = () => {
  const [isChecking, setIsChecking] = useState(true)

  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(selectAccessToken)

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE)
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE) || ''

    if (token) {
      dispatch(setAccessToken({ token, refreshToken }))
      console.log('reload')
    }

    setIsChecking(false)
  }, [dispatch, accessToken])

  return {
    isChecking,
  }
}

import { FormEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useGeneratePasswordMutation,
  useLoginWithCodeMutation,
} from '../../api/account/account.api'
import {
  ACCESS_TOKEN_STORAGE,
  REFRESH_TOKEN_STORAGE,
} from '../../constants/storage/storage.constants'
import { setAccessToken } from '../../redux/auth/auth.slice'
import { useAppDispatch } from '../redux/useRedux'

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
}

interface SignInForm extends HTMLFormElement {
  readonly elements: FormElements
}

export const useAuth = () => {
  const [loginWithCodeMutation] = useLoginWithCodeMutation()
  const [generatePasswordMutation] = useGeneratePasswordMutation()

  const [loginError, setLoginError] = useState(false)
  const [codeError, setCodeError] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onLoginWithEmailSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget as HTMLFormElement)

    const code = []

    for (let [_, value] of formData.entries()) {
      code.push(Number(value))
    }

    const verificationCode = code.join('')

    try {
      const result = await loginWithCodeMutation({
        email: 'demo6@demo.com',
        code: verificationCode,
        languageId: '2121',
      }).unwrap()

      const {
        jwt: { token, refreshToken },
      } = result

      localStorage.setItem(ACCESS_TOKEN_STORAGE, token)
      localStorage.setItem(REFRESH_TOKEN_STORAGE, refreshToken)

      dispatch(setAccessToken({ token, refreshToken }))

      navigate('/')

      setCodeError(false)
    } catch (error) {
      setCodeError(true)
    }
  }, [])

  const onSendCodeWithEmailSubmit = useCallback(
    async (event: FormEvent<SignInForm>) => {
      event.preventDefault()

      try {
        const { email } = event.currentTarget.elements

        if (!email.value) throw new Error('No email')

        const result = await generatePasswordMutation({
          email: email.value,
          languageId: 'b73471f8-a753-4d71-8d5b-2ca27a10779b',
        }).unwrap()

        setLoginError(false)

        navigate('/auth/code')
      } catch (error) {
        setLoginError(true)
      }
    },
    []
  )

  return {
    onLoginWithEmailSubmit,
    onSendCodeWithEmailSubmit,
    loginError,
    codeError,
  }
}

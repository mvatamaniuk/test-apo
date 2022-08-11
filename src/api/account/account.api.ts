import {
  IGeneratePasswordBody,
  IGeneratePasswordResponse,
  ILoginWithCodeBody,
  ILoginWithCodeResponse,
} from '../../types/api/auth/IAuth'
import { IUser } from '../../types/user/IUser'

import { mainApi } from '../main.api'

const accountApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    loginWithCode: build.mutation<ILoginWithCodeResponse, ILoginWithCodeBody>({
      query: (body) => ({
        url: 'accounts/loginWithCode',
        method: 'POST',
        body,
      }),
    }),
    generatePassword: build.mutation<
      IGeneratePasswordResponse,
      IGeneratePasswordBody
    >({
      query: (body) => ({
        url: 'accounts/generatePassword',
        method: 'POST',
        body,
      }),
    }),
    getCurrentUser: build.query<IUser, void>({
      query: () => 'accounts/getCurrentAppUser',
    }),
    logout: build.mutation<string, void>({
      query: () => ({
        url: 'accounts/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useLoginWithCodeMutation,
  useGeneratePasswordMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = accountApi

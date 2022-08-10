import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import {
  ACCESS_TOKEN_STORAGE,
  REFRESH_TOKEN_STORAGE,
} from '../constants/storage/storage.constants'
import { setAccessToken } from '../redux/auth/auth.slice'
import { RootState } from '../redux/store.redux'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://azapp-playground-demo-api.azurewebsites.net/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions = {}
) => {
  let result = await baseQuery(args, api, extraOptions)

  const { accessToken, refreshToken } = (api.getState() as RootState).auth

  if (result.error?.status === 401) {
    const { data } = await baseQuery(
      {
        url: '/accounts/refreshToken',
        method: 'POST',
        body: { token: accessToken, refreshToken },
      },
      api,
      extraOptions
    )

    if (data) {
      //@ts-ignore
      localStorage.setItem(ACCESS_TOKEN_STORAGE, data.token)
      //@ts-ignore
      localStorage.setItem(REFRESH_TOKEN_STORAGE, data.refreshToken)

      api.dispatch(
        setAccessToken({
          //@ts-ignore
          token: data.token,
          //@ts-ignore
          refreshToken: data.refreshToken,
        })
      )

      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: baseQueryRefresh,
  endpoints: () => ({}),
})

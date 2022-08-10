import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { JWT } from '../../types/api/auth/IAuth'
import { Token } from '../../types/shared/shared.types'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    setAccessToken: (state, action: PayloadAction<JWT>) => {
      const { token, refreshToken } = action.payload

      state.accessToken = token
      state.refreshToken = refreshToken
    },
  },
  extraReducers: (builder) => {},
})

export const { setAccessToken } = authSlice.actions

export default authSlice.reducer

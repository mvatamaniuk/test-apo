import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '../../types/user/IUser'
import { initialState } from './user.types'

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer

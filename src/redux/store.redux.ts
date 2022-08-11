import { configureStore } from '@reduxjs/toolkit'

import { mainApi } from '../api/main.api'

import authSlice from './auth/auth.slice'
import globalSlice from './global/global.slice'
import userSlice from './user/user.slice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    global: globalSlice,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

import { configureStore } from '@reduxjs/toolkit'

import { mainApi } from '../api/main.api'
import authSlice from './auth/auth.slice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

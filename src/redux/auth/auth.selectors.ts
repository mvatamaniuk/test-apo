import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store.redux'

const self = (state: RootState) => state

export const selectAccessToken = createSelector(
  self,
  (state) => state.auth.accessToken
)

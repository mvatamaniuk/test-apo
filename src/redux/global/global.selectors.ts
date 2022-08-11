import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store.redux'

const self = (state: RootState) => state

export const selectGlobal = createSelector(self, (state) => state.global)

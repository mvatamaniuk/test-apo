import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GlobalParamsPayload, initialState } from './global.types'

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobal: (state, action: PayloadAction<GlobalParamsPayload>) => {
      const { defaultLanguageID, metaDescription } = action.payload

      state.defaultLanguageID = defaultLanguageID
      state.metaDescription = metaDescription
    },
  },
  extraReducers: (builder) => {},
})

export const { setGlobal } = globalSlice.actions

export default globalSlice.reducer

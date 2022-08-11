import { mainApi } from '../main.api'

const globalApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    useGetAllDynamic: build.query<any, void>({
      query: () => 'globalParameters/GetAllDynamic',
    }),
  }),
})

export const { useUseGetAllDynamicQuery } = globalApi

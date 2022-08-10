import {
  IPatchUserCrmBody,
  IPatchUserCrmResponse,
} from '../../types/api/user-crm/IUserCrm'
import { mainApi } from '../main.api'

const userCrmProfileApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getUserCrmProfileDynamic: build.query<any, void>({
      query: () => 'userCrmProfiles/getAllDynamic',
    }),
    patchUserCrmProfile: build.mutation<
      IPatchUserCrmResponse,
      Partial<IPatchUserCrmBody> & Pick<IPatchUserCrmBody, 'id'>
    >({
      query: ({ id, ...patch }) => ({
        method: 'PATCH',
        url: `userCrmProfiles/patch/${id}`,
        body: patch,
      }),
    }),
  }),
})

export const {
  useGetUserCrmProfileDynamicQuery,
  usePatchUserCrmProfileMutation,
} = userCrmProfileApi

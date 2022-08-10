import { IUser } from '../../types/user/IUser'

interface IInitialState {
  user: IUser | null
}

export const initialState: IInitialState = {
  user: null,
}

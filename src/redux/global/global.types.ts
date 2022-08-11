export interface GlobalParamsPayload {
  defaultLanguageID: string
  metaDescription: string
}

interface IInitialState extends GlobalParamsPayload {}

export const initialState: IInitialState = {
  defaultLanguageID: '',
  metaDescription: '',
}

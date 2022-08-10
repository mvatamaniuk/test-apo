export type JWT = {
  token: string
  refreshToken: string
}

export interface ILoginWithCodeBody {
  email: string
  code: string
  languageId: string
}

export interface ILoginWithCodeResponse {
  jwt: JWT
  expires: string
}

export interface IGeneratePasswordBody {
  email: string
  languageId: string
}

export interface IGeneratePasswordResponse {}

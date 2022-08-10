export interface IPatchUserCrmBody {
  path: string
  value: string
  id?: string
  operationType: number
  op: string
  from: string
}

export interface IPatchUserCrmResponse {}

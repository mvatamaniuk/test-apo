export interface IPatchUserCrmBody {
  path: string
  value: string | Date | number | null
  id?: string
  operationType: number
  op: string
  from: string
}

export interface IPatchUserCrmResponse {}

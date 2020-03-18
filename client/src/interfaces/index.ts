export interface ITransaction {
  text: string
  amount: number
  _id?: string
  [key: string]: any
}
export interface IAppState {
  transactions: Array<ITransaction>
  error: Error | null
  loading: boolean
  [func: string]: any
}

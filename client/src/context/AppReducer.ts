import { IAppState, ITransaction } from '../interfaces'

type Actions =
  | { type: 'GET_TRANSACTIONS'; payload: ITransaction[] }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: ITransaction }
  | { type: 'TRANSACTION_ERROR'; payload: Error }

export default (state: IAppState, action: Actions) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction: ITransaction) => transaction._id !== action.payload
        ),
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

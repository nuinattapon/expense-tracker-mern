import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'
import { IAppState, ITransaction } from '../interfaces'
// Set Global axios defaults
axios.defaults.baseURL = '/api/v1/transactions'

// Initial state
const initialState: IAppState = {
  transactions: [],
  error: null,
  loading: true,
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get('/')

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data as ITransaction[],
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error as Error,
      })
    }
  }

  async function deleteTransaction(id: string) {
    try {
      await axios.delete(`/${id}`)

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  async function addTransaction(transaction: ITransaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }

    try {
      const res = await axios.post('/', transaction, config)

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

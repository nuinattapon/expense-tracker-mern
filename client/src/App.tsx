import React from 'react'
import { Header } from './components/Header'
import { Balance } from './components/Balance'
import { IncomeExpenses } from './components/IncomeExpenses'
import { TransactionList } from './components/TransactionList'
import { AddTransaction } from './components/AddTransaction'

import { GlobalProvider } from './context/GlobalState'

import './App.css'
import TextMessage from './components/TextMessage'

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Header />
      <TextMessage message="Expense Tracker application using TypeScript" />

      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  )
}

export default App

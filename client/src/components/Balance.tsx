import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'
import { ITransaction } from '../interfaces'

export const Balance: React.FC = () => {
  const { transactions } = useContext(GlobalContext)

  const amounts = transactions.map(
    (transaction: ITransaction) => transaction.amount
  )

  const total = amounts
    .reduce((acc: number, item: number) => (acc += item), 0)
    .toFixed(2)

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${numberWithCommas(total)}</h1>
    </>
  )
}

const express = require('express')

const router = express.Router()

const {
  getTransaction,
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require('../controllers/transactions')

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction)

router
  .route('/:id')
  .get(getTransaction)
  .delete(deleteTransaction)
  .put(updateTransaction)

module.exports = router

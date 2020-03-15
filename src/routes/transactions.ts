// const express = require('express')
import express from 'express'

export const router = express.Router()

import {
  getTransaction,
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transactions'

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction)

router
  .route('/:id')
  .get(getTransaction)
  .delete(deleteTransaction)
  .put(updateTransaction)

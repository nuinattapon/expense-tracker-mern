import { Request, Response, NextFunction } from 'express'
import { Transaction } from '../models/Transaction'

// @desc    Get transaction
// @route   GET /api/v1/transactions/:id
// @access  Public
export const getTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found',
      })
    }

    return res.status(200).json({
      success: true,
      data: transaction,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
export const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transactions = await Transaction.find()

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
export const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, amount } = req.body

    const transaction = await Transaction.create(req.body)

    return res.status(201).json({
      success: true,
      data: transaction,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val: any) => val.message)

      return res.status(400).json({
        success: false,
        error: messages,
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      })
    }
  }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
export const deleteTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found',
      })
    }

    await transaction.remove()
    return res.status(200).json({
      success: true,
      data: {},
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}

// @desc    Put transaction
// @route   PUT /api/v1/transactions/:id
// @access  Public
export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, amount } = req.body
    const id = req.params.id
    console.log({ id, text, amount })
    const transaction = await Transaction.findByIdAndUpdate(id, {
      text,
      amount,
    })

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found',
      })
    }

    const updatedTransaction = await Transaction.findById(id)

    return res.status(200).json({
      success: true,
      data: { updatedTransaction },
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}

import express from 'express';
import {getTransaction, getAccountTransactions} from '../controllers/transactionController.js'

const router = express.Router();

// get transaction by id
router.get('/:id', getTransaction);

// get transactions for an account  
router.get('/account/:accountId', getAccountTransactions);

export default router;
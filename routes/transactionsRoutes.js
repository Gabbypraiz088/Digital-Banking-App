import express from 'express';
import {getTransaction, getAccountTransactions} from '../controllers/transactionController.js'
import {authenticate} from '../middlewares/authMiddleware.js';
import {validate} from '../middlewares/validationMiddleware.js';
import {transactionValidatorSchema} from '../validators/transactionValidator.js';

const router = express.Router();

// get transaction by id
router.get('/:id', authenticate, validate(transactionValidatorSchema), getTransaction);

// get transactions for an account  
router.get('/account/:accountId', authenticate, validate(transactionValidatorSchema), getAccountTransactions);

export default router;
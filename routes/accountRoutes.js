import express from 'express';
import {createAccount, getAccountBalance, getAccount, creditAccount, debitAccount} from '../controllers/accountsController.js';
import {authenticate} from '../middlewares/authMiddleware.js';
import {validate} from '../middlewares/validationMiddleware.js';
import {createAccountSchema, creditAccountSchema, debitAccountSchema} from '../validators/accountValidator.js';


const router = express.Router();

// Get account
router.get('/:id', authenticate, getAccount);

// Get Account Balance
router.get('/:accountId/balance', authenticate, getAccountBalance);

// Create account
router.post('/', authenticate, validate(createAccountSchema), createAccount);

// Credit account
router.post('/credit', authenticate, validate(creditAccountSchema), creditAccount);

// Debit account
router.post('/debit', authenticate, validate(debitAccountSchema), debitAccount);

export default router;
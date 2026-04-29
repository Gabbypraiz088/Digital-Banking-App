import express from 'express';
import {createAccount, getAccount, creditAccount, debitAccount} from '../controllers/accountsController.js';

const router = express.Router();

// Get account
router.get('/:id', getAccount);

// Create account
router.post('/', createAccount);

// Credit account
router.post('/credit', creditAccount);

// Debit account
router.post('/debit', debitAccount);

export default router;
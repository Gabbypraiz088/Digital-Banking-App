import express from 'express';
import {getAccountLedger} from '../controllers/ledgerController.js';

const router = express.Router();

// Get account ledger
router.get('/:id', getAccountLedger);

export default router;
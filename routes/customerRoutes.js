import express from 'express';
import {onboard, getCustomer, getBVNDetails, getNINDetails, verifyCustomer, authorizeCustomer} from '../controllers/customersController.js';

const router = express.Router();

// get customer details
router.get('/customers/:id', getCustomer);

// get BVN details
router.get('/bvn/:bvn', getBVNDetails);

// get NIN details
router.get('/nin/:nin', getNINDetails);

// onboard customer
router.post('/onboard', onboard);

// verify customer
router.post('/verify', verifyCustomer);

// authorize customer
router.post('/authorize', authorizeCustomer);

export default router;
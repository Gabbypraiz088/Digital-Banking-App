import express from 'express';
import {onboard, getCustomer, getBVNDetails, getNINDetails, verifyCustomer, authorizeCustomer} from '../controllers/customersController.js';
import {authenticate} from '../middleware/authMiddleware.js';
import {validate} from '../middlewares/validationMiddleware.js';
import {createCstomerSchema, bvnValidatorSchema, ninValidatorSchema } from '../validators/customerValidator.js';

const router = express.Router();

// get customer details
router.get('/customers/:id', authenticate, validate(createCustomerSchema), getCustomer);

// get BVN details
router.get('/bvn/:bvn', authenticate, validate(bvnValidatorSchema), getBVNDetails);

// get NIN details
router.get('/nin/:nin', authenticate, validate(ninValidatorSchema), getNINDetails);

// onboard customer
router.post('/onboard', authenticate, validate(createCustomerSchema), onboard);

// verify customer
router.post('/verify', authenticate, validate(createCustomerSchema), verifyCustomer);

// authorize customer
router.post('/authorize', authenticate, validate(createCustomerSchema), authorizeCustomer);

export default router;
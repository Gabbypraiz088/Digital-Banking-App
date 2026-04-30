import express from 'express';
const app = express();

// import routes
import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import transactionRoutes from './routes/transactionsRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import ledgerRoutes from './routes/ledgerRoutes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

import cors from 'cors';

app.use(cors());
app.use(express.json());

// check app health
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Digital Banking API'
    });
});

// routes
app.use('/auth', authRoutes);
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/customers', customerRoutes);
app.use('/ledgers', ledgerRoutes);
app.use(errorMiddleware);


export default app;

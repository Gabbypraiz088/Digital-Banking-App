import * as transactionServices from '../services/transactionServices';

// fetch transaction by reference
export const getTransaction = async (req, res, next) => {
    try{
        const transaction = await transactionServices.getTransaction(
            req.params.reference
        );

        res.status(200).json({
            success: true,
            data: transaction
        });

    } catch(error) {
        next(error);
    }
}; 

// fetch transaction for accounts
export const getAccountTransactions = async (req, res, next) => {
    try{
        const transactions = await transactionServices.getTransactionForAccount(
            req.params.accountId
        );

        res.status(200).json({
            success: true,
            data: transactions
        });

    } catch(error) {
        next(error);
    }
};
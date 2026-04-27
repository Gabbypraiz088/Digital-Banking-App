import * as ledgerService from '../services/ledgerServices';

// fetch account ledger
export const getAccountLedger = async (req, res, next) => {
    try{
        const entries = await ledgerService.getLedgerByAccount(
            req.params.accountId
          );

        res.status(200).json({
            status: 'success',
            data: entries
        });

    } catch(error) {
        next(error);
    }
}; 
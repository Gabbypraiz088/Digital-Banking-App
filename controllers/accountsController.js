import * as accountService from "../services/accountServices.js";  

export const createAccount = async (req, res, next) => {
  try {
    const account = await accountService.createAccount(req.validatedData);

    res.status(201).json({
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

// balance enquiry
export const getAccountBalance =
  async (req, res, next) => {

    try {

      const { accountId } = req.params;

      const balance = await accountService.getBalance(accountId);

      return res.status(200).json({
        success: true,
        message: "Balance fetched successfully",
        data: balance,
      });

    } catch (error) {

      next(error);

    }
};

// Get account
export const getAccount = async (req, res, next) => {
  try {
    const account = await accountService.getAccountById(req.params.id);

    res.status(200).json({ data: account });
  } catch (error) {
    next(error);
  } 
};

// Credit account
export const creditAccount = async (req, res, next) => {
  try {
    const { accountId, amount } = req.validatedData;

    const result = await accountService.creditAccount(accountId, amount);

    res.status(200).json({
      message: "Account credited successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Debit account
export const debitAccount = async (req, res, next ) => {
  try {
    const { accountId, amount } = req.validatedData;

    const result = await accountService.debitAccount(accountId, amount);

    res.status(200).json({
      message: "Account debited successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
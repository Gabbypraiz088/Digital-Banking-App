import * as accountService from "../services/accountServices";

export const createAccountController = async (req, res, next) => {
  try {
    const account = await accountService.createAccount(req.body);

    res.status(201).json({
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    next;
  }
};

// Get account
export const getAccountController = async (req, res) => {
  try {
    const account = await accountService.getAccountById(req.params.id);

    res.status(200).json({ data: account });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Credit account
export const creditAccountController = async (req, res) => {
  try {
    const { accountId, amount } = req.body;

    const result = await accountService.creditAccount(accountId, amount);

    res.status(200).json({
      message: "Account credited successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Debit account
export const debitAccountController = async (req, res) => {
  try {
    const { accountId, amount } = req.body;

    const result = await accountService.debitAccount(accountId, amount);

    res.status(200).json({
      message: "Account debited successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
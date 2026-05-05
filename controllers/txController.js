import * as transferService from "../services/txServices.js";

export const transfer = async (req, res) => {
  try {
    const { senderAccountId, receiverAccountNumber, bankcode, amount, narration } = req.body;

    const result = await transferService.transferFunds(
      senderAccountId,
      receiverAccountNumber,
      bankcode,
      amount,
      narration
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
import { nibssClient } from "./nibbsClient.js";


// funds transfer service
export const initiateTransfer = async (
  fromAccount,
  toAccount,
  amount,
  narration,
  reference
) => {
    const response = await nibssClient.post(
    "/transfer",
    {
      from: fromAccount,
      to: toAccount,    
      amount: String(amount),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {...response.data, // includes message, transactionId, status
    narration,
    reference,
    fromAccount,
    toAccount};
};
        
// transfer status check
export const checkTransactionRef = async (reference) => {
    const response = await nibssClient.get(
        `/transaction/${reference}`
    ); 
    return response.data;
}; 
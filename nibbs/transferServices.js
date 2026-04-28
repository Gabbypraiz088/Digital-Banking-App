import { nibssClient } from "./nibbsClient.js";


// funds transfer service
export const initiateTransfer = async (
  fromAccount,
  toAccount,
  amount,
  narration,
  reference
) => {
    const response = await nibbsClient.post(
        "/transfer",
        ({
            fromAccount,
            toAccount,
            amount,
            narration,
            reference
        })
    );

    return response.data;
};
        
// transfer status check
export const checkTransactionRef = async (reference) => {
    const response = await nibssClient.get(
        `/transaction/${reference}`
    ); 
    return response.data;
}; 
import * as customerService from "../services/customerServices"


// onboard customer
export const onboard = async (req, res) => {
   const customer = await customerService.onboard(req.body);

   res.json(customer);
};

// get customer by id
export const getCustomer = async (req, res, next) => {
  try {

    const { id } = req.params;

    const customer = await customerService.getCustomerById(id);

    res.status(200).json({
      success: true,
      data: customer,
    });

  } catch (error) {
    next(error);
  }
};

// get customer's BVN details
export const getBVNDetails = async (req, res, next) => {
  try {
    const { bvn } = req.params; 
    const details = await customerService.getBVNDetails(bvn);

    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    next(error);
  } 
};

// get customer's NIN details
export const getNINDetails = async (req, res, next) => {
  try {
    const { nin } = req.params; 
    const details = await customerService.getNINDetails(nin);

    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    next(error);
  } 
};

// verify customer
export const verifyCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const customer = await customerService.verifyCustomer(id, status);

    res.status(200).json({
      success: true,
      data: customer,
    });
  }
    catch (error) {
      next(error);
    } 
};

// authorize customer
export const authorizeCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authUserId } = req.body;
    const customer = await customerService.authorizeCustomer(id, authUserId);
    
    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error){
    next(error)
  }
};
  
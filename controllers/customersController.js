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

// 
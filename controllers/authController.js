import {register, login} from '../services/authServices.js';

// register User
export const registerUser = async(req, res, next) => {
    try{
        const result = await register(req, body);

        res.status(201).json({
            success: true,
            data: result
        })
    } catch(error) {
      res.status(401).json({
        success: false,

        message:
          error.message,
      });
    }
};

// login user
export const loginUser = async(req, res, next) => {
    try{
        const {email, password} = req.body;

        const result = await login(email, password);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch(error) {
      res.status(401).json({
        success: false,

        message:
          error.message,
      });
    }
};
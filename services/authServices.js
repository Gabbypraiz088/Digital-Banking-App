import {createAuthUser, findCustomerByEmail} from '../repo/authRepo.js';
import {hashpassword, comparePassword} from '../utils/hash.js';
import {generateToken} from '../utils/token.js';
import prisma from '../config/prisma.client.js';

// register user
export const register = async(payload) => {
    const existingUser = await findCustomerByEmail(payload.email);

    if(existingUser) {
        throw new Error('User already exists');
    };

    // hash password
    const hashedPassword = await hashpassword(payload.password);

    // create customer
    const customer = await prisma.customer.create({
        data: {
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,

            authUser: {
                create: {
                    hashpassword: hashedPassword
                }
            }
        },
        include: {authUser: true}
    });
    return { message: 'User registered successfully', customer };
};

// login user
export const login = async(email, password) => {
    const customer = await findCustomerByEmail(email);

    if(!customer || !customer.authUser) {
        throw new Error('Invalid credentials');
    }

    const validPassword = await comparePassword(password, customer.authUser.hashpassword);

    if(!validPassword) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken({ customerId: customer.id, email: customer.email });

    return { message: 'Login successful', token, customer: {
      id: customer.id,

      email:
        customer.email,

      firstName:
        customer.firstName,

      lastName:
        customer.lastName,
        }, 
    };
};

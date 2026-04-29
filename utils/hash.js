import bcrypt from 'bcrypt';

// hash password
export const hashpassword = async(password) => {
    return await bcrypt.hash(password, 10);
};

// compare password with hashedPWD
export const comparePassword = async(password, hashpassword) => {
    return await bcrypt.compare(password, hashpassword);
};


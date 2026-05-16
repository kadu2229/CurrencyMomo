import bcCrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from './user.model';

export const createUser = async (login: string, password: string) => {
    const userExists = await User.findOne({ where: { login } });
    if (userExists) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcCrypt.hash(password, 10);
    const user = await User.create({ login, password: hashedPassword });
    return user;
}

export const loginUser = async (login: string, password: string) => {
    const user = await User.findOne({ where: { login } });
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcCrypt.compare(password, user.getDataValue('password'));
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = Jwt.sign({id: user.getDataValue('id')}, process.env.JWT_SECRET!, { expiresIn: '7d' });

    return token;
}
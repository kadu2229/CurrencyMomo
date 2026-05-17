import { Request, Response } from 'express';
import { createUser, loginUser } from './user.service';

export const register = async (req: Request, res: Response) => {
    const {login, password} = req.body;
    try {
        const user = await createUser(login, password);
        res.status(201).json({ message: 'User created successfully', 
            user: {
                id: user.getDataValue('id'),
                login: user.getDataValue('login')
            } });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    const {login, password} = req.body;
    try {
        const token = await loginUser(login, password);
        res.status(200).json({message: 'Login successful', token });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}
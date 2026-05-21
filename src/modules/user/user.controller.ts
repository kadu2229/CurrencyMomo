import { createUserSchema, loginUserSchema } from "./user.schema";

import { Request, Response } from 'express';
import { createUser, loginUser } from './user.service';

export const register = async (req: Request, res: Response) => {
    const result = createUserSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }

    const { login, password } = result.data;
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
    const result = loginUserSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }

    const { login, password } = result.data;
    try {
        const token = await loginUser(login, password);
        res.status(200).json({message: 'Login successful', token });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}
import { z } from 'zod';

export const createUserSchema = z.object({
    login: z.string().min(1, "Login is required"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

export const loginUserSchema = z.object({
    login: z.string().min(1, "Login is required"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

import { z } from "zod";

export const createIncomeSchema = z.object({
    description: z.string().min(1, "Description is required"),
    amount: z.number().positive("Amount must be a positive number")
});

export const updateIncomeSchema = z.object({
    description: z.string().min(1, "Description is required").optional(),
    amount: z.number().positive("Amount must be a positive number").optional()
});
import { z } from "zod";

export const createExpenseSchema = z.object({
    description: z.string().min(1, "Description is required"),
    amount: z.number().positive("Amount must be a positive number"),
    category: z.string().min(1, "Category is required")
});

export const updateExpenseSchema = z.object({
    description: z.string().min(1, "Description is required").optional(),
    amount: z.number().positive("Amount must be a positive number").optional(),
    category: z.string().min(1, "Category is required").optional()
});
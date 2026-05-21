import { z } from "zod";

export const createGoalSchema = z.object({
    title: z.string().min(1, "Title is required"),
    targetAmount: z.number().positive("Target amount must be a positive number")
});

export const updateGoalSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    targetAmount: z.number().positive("Target amount must be a positive number").optional()
});
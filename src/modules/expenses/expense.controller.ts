import { createExpenseSchema, updateExpenseSchema } from "./expense.schema";
import {
  createExpense,
  deleteExpense,
  updateExpense,
  getExpensesByUser,
} from "./expenses.service";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  const result = createExpenseSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  const { description, amount, category } = result.data;
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const expense = await createExpense(description, amount, category, userId);
    res.status(201).json(expense);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getByUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const expenses = await getExpensesByUser(userId);
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const result = updateExpenseSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  const id = req.params.id as string;
  const { description, amount, category } = result.data;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const expense = await updateExpense(parseInt(id), description, amount, category);
    res.status(200).json(expense);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await deleteExpense(parseInt(id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

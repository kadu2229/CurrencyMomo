import { createIncomeSchema, updateIncomeSchema } from "./income.schema";
import { Request, Response } from "express";
import { createIncome, updateIncome, deleteIncome, getIncomesByUser } from "./income.service";


export const create = async (req: Request, res: Response) => {
    const result = createIncomeSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }

  const { description, amount } = result.data;
  const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    try {
      const income = await createIncome(description, amount, userId);
      res.status(201).json(income);
    } catch (error) {
      res.status(500).json({ error: "Failed to create income" });
    }
};

export const getByUser = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    try {
        const incomes = await getIncomesByUser(userId);
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch incomes" });
    }
}

export const update = async (req: Request, res: Response) => {
    const result = updateIncomeSchema.safeParse(req.body);
    const id = req.params.id as string;
    const { description, amount } = result.data ?? {};
    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    try {        const income = await updateIncome(parseInt(id), description, amount);
        res.json(income);
    } catch (error) {
        res.status(500).json({ error: "Failed to update income" });
    }
}

export const remove = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    try {
        await deleteIncome(parseInt(id));
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete income" });
    }
}

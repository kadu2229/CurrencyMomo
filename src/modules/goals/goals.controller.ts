import { Request, Response } from "express";
import { createGoal, getGoalsByUser, updateGoal, deleteGoal } from "./goals.service";

export const create = async (req: Request, res: Response) => {
  const { title, targetAmount } = req.body;
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const goal = await createGoal(userId, title, targetAmount);
    res.status(201).json(goal);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllByUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const goals = await getGoalsByUser(userId);
    res.json(goals);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { title, targetAmount } = req.body;
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const goal = await updateGoal(parseInt(id), userId, title, targetAmount);
    res.json(goal);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    await deleteGoal(parseInt(id), userId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
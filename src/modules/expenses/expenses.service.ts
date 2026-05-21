import Expense from "./expenses.model";

export const createExpense = async (description: string, amount: number, category: string, userId: number) => {
    const expense = await Expense.create({ description, amount, category, userId });
    return expense;
};

export const getExpensesByUser = async (userId: number) => {
    const expenses = await Expense.findAll({ where: { userId } });
    return expenses;
};

export const updateExpense = async (id: number, description?: string, amount?: number, category?: string) => {
    const expense = await Expense.findByPk(id);
    if (!expense) {
        throw new Error("Expense not found");
    }
    await expense.update({ description, amount, category });
    return expense;
};

export const deleteExpense = async (id: number) => {
    const expense = await Expense.findByPk(id);
    if (!expense) {
        throw new Error("Expense not found");
    }
    await expense.destroy();
    return expense;
};
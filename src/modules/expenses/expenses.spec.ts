import { createExpense, getExpensesByUser, updateExpense, deleteExpense } from './expenses.service';
import Expense from './expenses.model';

jest.mock('./expenses.model');

describe('Expense Service', () => {

  it('should create an expense successfully', async () => {
    (Expense.create as jest.Mock).mockResolvedValue({
      id: 1,
      description: 'Aluguel',
      amount: 1500,
      category: 'Moradia',
      userId: 1
    });

    const expense = await createExpense('Aluguel', 1500, 'Moradia', 1);
    expect(expense).toHaveProperty('description', 'Aluguel');
  });

  it('should return expenses by user', async () => {
    (Expense.findAll as jest.Mock).mockResolvedValue([
      { id: 1, description: 'Aluguel', amount: 1500, category: 'Moradia', userId: 1 }
    ]);

    const expenses = await getExpensesByUser(1);
    expect(expenses).toHaveLength(1);
  });

  it('should throw error when updating expense that does not exist', async () => {
    (Expense.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(updateExpense(99, 'Aluguel', 1500, 'Moradia')).rejects.toThrow('Expense not found');
  });

  it('should throw error when deleting expense that does not exist', async () => {
    (Expense.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(deleteExpense(99)).rejects.toThrow('Expense not found');
  });

  it('should delete expense successfully', async () => {
    const mockExpense = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true)
    };
    (Expense.findByPk as jest.Mock).mockResolvedValue(mockExpense);

    await deleteExpense(1);
    expect(mockExpense.destroy).toHaveBeenCalled();
  });

});
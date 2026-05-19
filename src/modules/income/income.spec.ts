import { createIncome, getIncomesByUser, updateIncome, deleteIncome } from './income.service';
import Income from './income.model';

jest.mock('./income.model');

describe('Income Service', () => {

  it('should create an income successfully', async () => {
    (Income.create as jest.Mock).mockResolvedValue({
      id: 1,
      description: 'Salário',
      amount: 3000,
      userId: 1
    });

    const income = await createIncome('Salário', 3000, 1);
    expect(income).toHaveProperty('description', 'Salário');
  });

  it('should return incomes by user', async () => {
    (Income.findAll as jest.Mock).mockResolvedValue([
      { id: 1, description: 'Salário', amount: 3000, userId: 1 }
    ]);

    const incomes = await getIncomesByUser(1);
    expect(incomes).toHaveLength(1);
  });

  it('should throw error when updating income that does not exist', async () => {
    (Income.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(updateIncome(99, 'Salário', 3000)).rejects.toThrow('Income not found');
  });

  it('should throw error when deleting income that does not exist', async () => {
    (Income.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(deleteIncome(99)).rejects.toThrow('Income not found');
  });

  it('should delete income successfully', async () => {
    const mockIncome = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true)
    };
    (Income.findByPk as jest.Mock).mockResolvedValue(mockIncome);

    await deleteIncome(1);
    expect(mockIncome.destroy).toHaveBeenCalled();
  });

});
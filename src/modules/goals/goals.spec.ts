import { createGoal, getGoalsByUser, updateGoal, deleteGoal } from './goals.service';
import Goal from './goals.model';

jest.mock('./goals.model');

describe('Goal Service', () => {

  it('should create a goal successfully', async () => {
    (Goal.create as jest.Mock).mockResolvedValue({
      id: 1,
      userId: 1,
      title: 'Viagem para Europa',
      targetAmount: 15000
    });

    const goal = await createGoal(1, 'Viagem para Europa', 15000);
    expect(goal).toHaveProperty('title', 'Viagem para Europa');
  });

  it('should return goals by user', async () => {
    (Goal.findAll as jest.Mock).mockResolvedValue([
      { id: 1, userId: 1, title: 'Viagem para Europa', targetAmount: 15000 }
    ]);

    const goals = await getGoalsByUser(1);
    expect(goals).toHaveLength(1);
  });

  it('should throw error when updating goal that does not exist', async () => {
    (Goal.findOne as jest.Mock).mockResolvedValue(null);

    await expect(updateGoal(99, 1, 'Viagem para Europa', 15000)).rejects.toThrow('Goal not found');
  });

  it('should throw error when deleting goal that does not exist', async () => {
    (Goal.findOne as jest.Mock).mockResolvedValue(null);

    await expect(deleteGoal(99, 1)).rejects.toThrow('Goal not found');
  });

  it('should delete goal successfully', async () => {
    const mockGoal = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true)
    };
    (Goal.findOne as jest.Mock).mockResolvedValue(mockGoal);

    await deleteGoal(1, 1);
    expect(mockGoal.destroy).toHaveBeenCalled();
  });

  it('should update goal successfully', async () => {
    const mockGoal = {
      id: 1,
      update: jest.fn().mockResolvedValue({ id: 1, title: 'Novo título', targetAmount: 20000 })
    };
    (Goal.findOne as jest.Mock).mockResolvedValue(mockGoal);

    await updateGoal(1, 1, 'Novo título', 20000);
    expect(mockGoal.update).toHaveBeenCalledWith({ title: 'Novo título', targetAmount: 20000 });
  });

});
import Goal from "./goals.model";

export const createGoal = async (userId: number, title: string, targetAmount: number) => {
    const goal = await Goal.create({ userId, title, targetAmount });
    return goal;
}

export const getGoalsByUser = async (userId: number) => {
    const goals = await Goal.findAll({ where: { userId } });
    return goals;
}

export const updateGoal = async (id: number, userId: number, title: string, targetAmount: number) => {
    const goal = await Goal.findOne({ where: { id, userId } });
    if (!goal) {
        throw new Error("Goal not found");
    }
    await goal.update({ title, targetAmount });
    return goal;
}

export const deleteGoal = async (id: number, userId: number) => {
    const goal = await Goal.findOne({ where: { id, userId } });
    if (!goal) {
        throw new Error("Goal not found");
    }
    await goal.destroy();
    return goal;
}
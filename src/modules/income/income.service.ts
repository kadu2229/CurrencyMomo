import Income from "./income.model";

export const createIncome = async (description: string | undefined, amount: number, userId: number) => {
  return Income.create({ description, amount, userId });
}

export const getIncomesByUser = async (userId: number) => {
  return Income.findAll({ where: { userId } });
}

export const updateIncome = async (id: number, description: string | undefined, amount: number | undefined) => {
  const income = await Income.findByPk(id);
  if (!income) {
    throw new Error("Income not found");
  }
  return income.update({ description, amount });
}

export const deleteIncome = async (id: number) => {
  const income = await Income.findByPk(id);
  if (!income) {
    throw new Error("Income not found");
  }
  return income.destroy();
}
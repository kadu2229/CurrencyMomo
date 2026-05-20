import User from '../modules/user/user.model';
import Expense from '../modules/expenses/expenses.model';
import Income from '../modules/income/income.model';
import Goal from '../modules/goals/goals.model';

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Income, { foreignKey: 'userId' });
Income.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Goal, { foreignKey: 'userId' });
Goal.belongsTo(User, { foreignKey: 'userId' });
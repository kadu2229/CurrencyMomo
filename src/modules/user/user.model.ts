import { DataTypes } from "sequelize";
import connection from "../../config/db";
import Expense from "../expenses/expenses.model";
import Income from "../income/income.model";
import Goal from "../goals/goals.model";

const User = connection.define('User', {
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;
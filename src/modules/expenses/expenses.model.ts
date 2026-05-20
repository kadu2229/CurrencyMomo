import { DataTypes } from "sequelize";
import connection from "../../config/db";
import User from "../user/user.model";

const Expense = connection.define('Expense', {
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Expense;

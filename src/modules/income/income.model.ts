import { DataTypes } from "sequelize";
import connection from "../../config/db";
import User from "../user/user.model";

const Income = connection.define('Income', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Income
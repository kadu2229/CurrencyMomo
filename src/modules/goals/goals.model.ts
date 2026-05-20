import { DataTypes } from "sequelize";
import connection from "../../config/db";

const Goal = connection.define("Goal", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    targetAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

export default Goal;
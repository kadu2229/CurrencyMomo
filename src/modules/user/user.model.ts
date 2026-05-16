import { DataTypes } from "sequelize";
import connection from "../../config/db";

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
import express from 'express';
import dotenv from 'dotenv';
import connection from './config/db';
import User from './modules/user/user.model';
import Expense from './modules/expenses/expenses.model';
import userRoutes from './modules/user/user.routes';
import expenseRoutes from './modules/expenses/expense.routes';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/users',userRoutes);
app.use('/api/expenses', expenseRoutes);

const start = async () => {
    try {
        await connection.authenticate();
        console.log('Database connected!');

        await connection.sync({ force: true });
        console.log('Models:', Object.keys(connection.models));
        console.log('Tables created!');

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        console.error('Unable to connect:', error);
    }
}

start();
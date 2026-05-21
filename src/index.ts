import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './config/db';
import User from './modules/user/user.model';
import Expense from './modules/expenses/expenses.model';
import Income from './modules/income/income.model';
import Goal from './modules/goals/goals.model';
import goalRoutes from './modules/goals/goals.routes';
import incomeRoutes from './modules/income/income.routes';
import userRoutes from './modules/user/user.routes';
import expenseRoutes from './modules/expenses/expense.routes';
import './config/associations';
import helmet from 'helmet';
import { limiter } from './config/rateLimiter';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(limiter);


app.use('/api/incomes', incomeRoutes);
app.use('/api/users',userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/goals', goalRoutes);

const start = async () => {
    try {
        await connection.authenticate();
        console.log('Database connected!');

        await connection.sync();
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
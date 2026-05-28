import dotenv from 'dotenv';
dotenv.config();
import './config/env';

import logger from './config/logger';
import SwaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
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
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { limiter } from './config/rateLimiter';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  methods: ['GET', 'POST','PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/incomes', incomeRoutes);
app.use('/api/users',userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
app.use(errorHandler);

const start = async () => {
    try {
        await connection.authenticate();
        logger.info('Database connected!');

        app.listen(process.env.PORT || 3000, () => {
            logger.info(`Server running on port ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        logger.error('Unable to connect:', error);
    }
}

start();
import express from 'express';
import dotenv from 'dotenv';
import connection from './db';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

const start = async () => {
  try {
    await connection.authenticate();
    console.log('Database connected!');
    
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start();
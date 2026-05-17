import { createUser } from './user.service';
import User from './user.model';
import bcrypt from 'bcrypt';

// simula o model User
jest.mock('./user.model');
jest.mock('bcrypt');

describe('User Service', () => {
  
  it('should create a user successfully', async () => {
    // simula que o usuário não existe
    (User.findOne as jest.Mock).mockResolvedValue(null);
    // simula o hash da senha
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    // simula a criação do usuário
    (User.create as jest.Mock).mockResolvedValue({ 
      id: 1, 
      login: 'teste', 
      password: 'hashedPassword' 
    });

    const user = await createUser('teste', '123456');
    expect(user).toHaveProperty('login', 'teste');
  });

  it('should throw error if user already exists', async () => {
    // simula que o usuário já existe
    (User.findOne as jest.Mock).mockResolvedValue({ id: 1, login: 'teste' });

    await expect(createUser('teste', '123456')).rejects.toThrow('User already exists');
  });

});
import { createUser } from './user.service';
import User from './user.model';
import bcrypt from 'bcrypt';

jest.mock('./user.model');
jest.mock('bcrypt');

describe('User Service', () => {
  
  it('should create a user successfully', async () => {

    (User.findOne as jest.Mock).mockResolvedValue(null);

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    (User.create as jest.Mock).mockResolvedValue({ 
      id: 1, 
      login: 'teste', 
      password: 'hashedPassword' 
    });

    const user = await createUser('teste', '123456');
    expect(user).toHaveProperty('login', 'teste');
  });

  it('should throw error if user already exists', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ id: 1, login: 'teste' });

    await expect(createUser('teste', '123456')).rejects.toThrow('User already exists');
  });

});
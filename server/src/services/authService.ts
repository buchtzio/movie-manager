import { User } from '../types/index';
import { generateToken } from '../utils/jwt';

// Hardcoded credentials for demonstration purposes
const VALID_CREDENTIALS: User = {
  username: 'admin',
  password: '1234',
};

export const loginUser = (username: string, password: string): { success: boolean; token?: string; error?: string } => {
  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    const token = generateToken(username);
    return { success: true, token };
  }
  return { success: false, error: 'Invalid credentials' };
};
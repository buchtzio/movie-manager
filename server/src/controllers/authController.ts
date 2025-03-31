import { Request, Response } from 'express';
import { loginUser } from '../services/authService';
import { logger } from '../utils/logger';

export const login = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required',
      });
    }
    
    const result = loginUser(username, password);
    
    if (!result.success) {
      return res.status(401).json({
        success: false,
        error: result.error,
      });
    }
    
    return res.status(200).json({
      success: true,
      data: {
        token: result.token,
      },
    });
  } catch (error) {
    logger.error(`Login error: ${error}`);
    return res.status(500).json({
      success: false,
      error: 'An error occurred during login',
    });
  }
};

export const getMe = (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
  
    const { username } = req.user;
  
    return res.status(200).json({
      success: true,
      data: {
        username,
      },
    });
  };
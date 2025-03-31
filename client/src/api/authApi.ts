import { apiClient } from './config';
import { User, ApiResponse } from '../types';

interface LoginResponse {
  token: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      { username, password }
    );
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Login failed');
    }
    
    const { token } = response.data.data;
    localStorage.setItem('token', token);
    
    return { token };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Login failed');
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const response = await apiClient.get<ApiResponse<{ username: string }>>('/auth/me', {
      headers: { Authorization: `Bearer ${token}`},
    });

    if (!response.data.success || !response.data.data) {
      return null;
    }

    return { username: response.data.data.username, token };
  } catch (error) {
    return null;
  }
};

export const checkAuth = async (): Promise<boolean> => {
  const currentUser = await getCurrentUser();
  return currentUser !== null;
};

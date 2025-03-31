import { apiClient } from './config';
import { Movie, ApiResponse, MovieFilterParams } from '../types';

export const getAllMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Movie[]>>('/movies');
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch movies');
    }
    
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch movies');
  }
};

export const searchMovies = async (params: MovieFilterParams): Promise<Movie[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.title) {
      queryParams.append('title', params.title);
    }
    
    if (params.genre) {
      queryParams.append('genre', params.genre);
    }
    
    if (params.year) {
      queryParams.append('year', params.year);
    }
    
    if (params.sortBy) {
      queryParams.append('sortBy', params.sortBy);
      
      if (params.sortOrder) {
        queryParams.append('sortOrder', params.sortOrder);
      }
    }
    
    const response = await apiClient.get<ApiResponse<Movie[]>>(
      `/movies/search?${queryParams.toString()}`
    );
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Search failed');
    }
    
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Search failed');
  }
};
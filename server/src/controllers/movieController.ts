import { Request, Response } from 'express';
import { fetchMovies, searchMoviesByTitle, searchMoviesWithFilters } from '../services/movieService';
import { logger } from '../utils/logger';

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await fetchMovies();
    
    return res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    logger.error(`Error in getAllMovies: ${error}`);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch movies',
    });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  try {
    const { title, genre, year, sortBy, sortOrder } = req.query;
    
    // If there are no search parameters, return all movies
    if (!title && !genre && !year && !sortBy) {
      const movies = await fetchMovies();
      return res.status(200).json({
        success: true,
        data: movies,
      });
    }
    
    // If there's only a title parameter, use the simpler search function
    if (title && !genre && !year && !sortBy) {
      const movies = await searchMoviesByTitle(title as string);
      return res.status(200).json({
        success: true,
        data: movies,
      });
    }
    
    // Use the advanced search with filters
    const movies = await searchMoviesWithFilters(
      title as string | undefined,
      genre as string | undefined,
      year as string | undefined,
      sortBy as string | undefined,
      sortOrder as 'asc' | 'desc' | undefined
    );
    
    return res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    logger.error(`Error in searchMovies: ${error}`);
    return res.status(500).json({
      success: false,
      error: 'Failed to search movies',
    });
  }
};
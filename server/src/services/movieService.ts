import axios from 'axios';
import { Movie } from '../types/index';
import { logger } from '../utils/logger';
import { config } from 'dotenv';

config();

const MOVIE_API_URL = process.env.MOVIE_API_URL;

let cachedMovies: Movie[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const fetchMovies = async (): Promise<Movie[]> => {
  const currentTime = Date.now();
  
  // Use cached movies if they exist and are not expired
  if (cachedMovies.length > 0 && currentTime - lastFetchTime < CACHE_DURATION) {
    return cachedMovies;
  }

  try {
    if(!MOVIE_API_URL) return [];
    const response = await axios.get<Movie[]>(MOVIE_API_URL);
    cachedMovies = response.data.map((movie, index) => ({
      ...movie,
      id: movie.id || `movie-${index}`, // Ensure each movie has an ID
    }));
    lastFetchTime = currentTime;
    return cachedMovies;
  } catch (error) {
    logger.error(`Error fetching movies: ${error}`);
    throw new Error('Failed to fetch movies from the API');
  }
};

export const searchMoviesByTitle = async (title: string): Promise<Movie[]> => {
  try {
    const movies = await fetchMovies();
    const searchTerm = title.toLowerCase();
    
    return movies.filter(movie => 
      movie.Title.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    logger.error(`Error searching movies: ${error}`);
    throw error;
  }
};

export const searchMoviesWithFilters = async (
  title?: string,
  genre?: string,
  year?: string,
  sortBy?: string,
  sortOrder?: 'asc' | 'desc'
): Promise<Movie[]> => {
  try {
    const movies = await fetchMovies();
    let filteredMovies = [...movies];
    
    if (title) {
      const searchTerm = title.toLowerCase();
      filteredMovies = filteredMovies.filter(movie => 
        movie.Title.toLowerCase().includes(searchTerm)
      );
    }
    
    if (genre) {
      const genreTerm = genre.toLowerCase();
      filteredMovies = filteredMovies.filter(movie => 
        movie.Genre.toLowerCase().includes(genreTerm)
      );
    }
    
    if (year) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.Year.startsWith(year)
      );
    }
    
    if (sortBy) {
      const order = sortOrder === 'desc' ? -1 : 1;
      
      filteredMovies.sort((a, b) => {
        if (sortBy === 'title') {
          return order * a.Title.localeCompare(b.Title);
        } else if (sortBy === 'year') {
          return order * (parseInt(a.Year) - parseInt(b.Year));
        }
        return 0;
      });
    }
    
    return filteredMovies;
  } catch (error) {
    logger.error(`Error filtering movies: ${error}`);
    throw error;
  }
};
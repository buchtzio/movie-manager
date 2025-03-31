import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from '../utils/favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const checkIsFavorite = useCallback((movieId: string): boolean => {
    return isFavorite(movieId);
  }, []);

  const toggleFavorite = useCallback((movie: Movie): void => {
    if (checkIsFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }

    setFavorites(getFavorites());
  }, [checkIsFavorite]);

  return {
    favorites,
    toggleFavorite,
    checkIsFavorite,
  };
};

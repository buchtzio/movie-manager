import { Movie } from '../types';

const FAVORITES_KEY = 'movieFavorites';

export const getFavorites = (): Movie[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addFavorite = (movie: Movie): void => {
  try {
    const favorites = getFavorites();
    if (!favorites.some(fav => fav.id === movie.id)) {
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

export const removeFavorite = (movieId: string): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export const isFavorite = (movieId: string): boolean => {
  try {
    const favorites = getFavorites();
    return favorites.some(movie => movie.id === movieId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};
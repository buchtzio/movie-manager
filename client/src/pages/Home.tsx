import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import { Movie, MovieFilterParams } from '../types';
import { getAllMovies, searchMovies } from '../api/movieApi';
import { useFavorites } from '@/hooks/useFavorites';

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, checkIsFavorite } = useFavorites();
  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllMovies();
        setMovies(data);
        setAllMovies(data);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMovies();
  }, []);

  const handleSearch = async (params: MovieFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchMovies(params);
      setMovies(results);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Movie Search
        </Typography>
        
        <SearchBar onSearch={handleSearch} movies={allMovies} />
        
        <MovieGrid 
          movies={movies} 
          loading={loading} 
          error={error} 
          toggleFavorite={toggleFavorite}
          checkIsFavorite={checkIsFavorite}
        />
      </Box>
    </Container>
  );
};

export default Home;
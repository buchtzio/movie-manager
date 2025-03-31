import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  toggleFavorite: (movie: Movie) => void;
  checkIsFavorite: (movieId: string) => boolean;
}

const MovieGrid = ({ movies, loading, error, toggleFavorite, checkIsFavorite }: MovieGridProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (movies.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No favorite movies found.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
          <MovieCard 
            movie={movie} 
            toggleFavorite={toggleFavorite} 
            checkIsFavorite={checkIsFavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;

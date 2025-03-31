import { Container, Typography, Box } from '@mui/material';
import MovieGrid from '../components/MovieGrid';
import { useFavorites } from '../hooks/useFavorites';

const Favorites = () => {
  const { favorites, toggleFavorite, checkIsFavorite } = useFavorites();

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Favorite Movies
        </Typography>

        {favorites.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            You have no favorite movies yet.
          </Typography>
        ) : (
          <MovieGrid 
            movies={favorites} 
            loading={false} 
            error={null} 
            toggleFavorite={toggleFavorite} 
            checkIsFavorite={checkIsFavorite}
          />
        )}
      </Box>
    </Container>
  );
};

export default Favorites;

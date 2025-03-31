import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  toggleFavorite: (movie: Movie) => void;
  checkIsFavorite: (movieId: string) => boolean;
}

const MovieCard = ({ movie, toggleFavorite, checkIsFavorite }: MovieCardProps) => {
  const isFavorite = checkIsFavorite(movie.id);

  const handleFavoriteClick = () => {
    toggleFavorite(movie);
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="300"
        image={movie.Poster.replace('http://', 'https://')}
        alt={movie.Title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.Year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.Genre}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <IconButton 
            aria-label="add to favorites" 
            onClick={handleFavoriteClick}
            color={isFavorite ? "secondary" : "default"}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default MovieCard;

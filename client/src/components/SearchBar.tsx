import { useState, FormEvent } from 'react';
import { Paper, Grid, Box, Button, SelectChangeEvent } from '@mui/material';
import SearchInput from './SearchInput';
import { MovieFilterParams, SortOrder, Movie } from '../types';
import SearchSelect from './SearchSelect';
import useGenresAndYears from '@/utils/useGenresAndYears';

interface SearchBarProps {
  onSearch: (params: MovieFilterParams) => void;
  movies: Movie[];
}

const SearchBar = ({ onSearch, movies }: SearchBarProps) => {
  const [filters, setFilters] = useState<{
    title: string;
    genre: string;
    year: string;
    sortBy: string;
    sortOrder: SortOrder;
  }>({
    title: '',
    genre: '',
    year: '',
    sortBy: '',
    sortOrder: 'asc',
  });

  const [genres, years] = useGenresAndYears(movies);

  const handleChange = (key: keyof typeof filters) => (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const value = e.target?.value;
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({ title: '', genre: '', year: '', sortBy: '', sortOrder: 'asc' });
    onSearch({});
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} elevation={3} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <SearchInput value={filters.title} onChange={handleChange('title')} />
        </Grid>
        {['genre', 'year', 'sortBy', 'sortOrder'].map((key) => (
          <Grid key={key} item xs={6} md={2}>
            <SearchSelect
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={filters[key as keyof typeof filters]}
              options={key === 'genre' ? genres : key === 'year' ? years : key === 'sortBy' ? ['title', 'year'] : ['asc', 'desc']}
              onChange={handleChange(key as keyof typeof filters)}
              disabled={key === 'sortOrder' && !filters.sortBy}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={handleReset}>Reset</Button>
            <Button variant="contained" type="submit">Search</Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchBar;

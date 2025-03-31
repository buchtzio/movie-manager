import { ChangeEvent } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search movies..."
      value={value}
      onChange={onChange}
      inputProps={{ 'aria-label': 'search movies' }}
    />
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
);

export default SearchInput;

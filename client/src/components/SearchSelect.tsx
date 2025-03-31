import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

interface SearchSelectProps {
  value: string;
  label: string;
  options: string[];
  onChange: (e: SelectChangeEvent) => void;
  disabled: boolean;
}

const SearchSelect = ({ value, label, options, onChange, disabled }: SearchSelectProps) => (
  <FormControl fullWidth size="small">
    <InputLabel id={`${label}-label`}>{label}</InputLabel>
    <Select
      labelId={`${label}-label`}
      value={value}
      label={label}
      onChange={onChange}
      disabled={disabled}
    >
      <MenuItem value="">
        <em>Any</em>
      </MenuItem>
      {options.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SearchSelect;

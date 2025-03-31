import { useState, useEffect } from 'react';
import { Movie } from '../types';

const useGenresAndYears = (movies: Movie[]) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const uniqueGenres = Array.from(new Set(movies.flatMap(movie =>
      movie.Genre.split(',').map(g => g.trim())
    ))).sort();

    const uniqueYears = Array.from(new Set(movies.flatMap(movie =>
      movie.Year.split('–').map(y => y.trim().split('–')[0])
    ))).sort();

    setGenres(uniqueGenres);
    setYears(uniqueYears);
  }, [movies]);

  return [genres, years];
};

export default useGenresAndYears;

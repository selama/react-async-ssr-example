import React, { useState } from 'react';
import { suspendable, useFetcher } from '../../hooks/use-fetcher';
import { fetchMovie, fetchRating, MovieDTO } from './movies-api';

export const Movie = suspendable(() => {
  const [id, setId] = useState<number>(0);
  const { title, year, meta } = useFetcher<MovieDTO>(
    () => fetchMovie(id),
    `fetchMovie-${id}`,
  );
  const rating = useFetcher<number>(() => fetchRating(id), `fetchRating-${id}`);
  return (
    <div>
      <div>
        {title} - {year} rating: {rating}
      </div>
      {meta.prevMovieId !== undefined && (
        <button onClick={() => setId(meta.prevMovieId as number)}>Prev</button>
      )}
      {meta.nextMovieId !== undefined && (
        <button onClick={() => setId(meta.nextMovieId as number)}>Next</button>
      )}
    </div>
  );
});

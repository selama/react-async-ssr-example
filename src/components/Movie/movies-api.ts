export interface MovieDTO {
  id: number;
  title: string;
  year: string;
  meta: {
    nextMovieId?: number;
    prevMovieId?: number;
  };
}

export const fetchMovie: (id: number) => Promise<MovieDTO> = (id: number) => {
  const movies = [
    { title: 'Back To The Future', year: '1985' },
    { title: 'The Joker', year: '2019' },
    { title: 'Pulp Fiction', year: '1994' },
    { title: 'The Godfather', year: '1972' },
    { title: 'Kill Bill', year: '2003' },
  ];
  const movie: MovieDTO = {
    id,
    ...movies[id],
    meta: {
      nextMovieId: id + 1 < movies.length ? id + 1 : undefined,
      prevMovieId: id - 1 >= 0 ? id - 1 : undefined,
    },
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movie);
    }, 500);
  });
};

export const fetchRating: (id: number) => Promise<number> = (id: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(5), 50);
  });

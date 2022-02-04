import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { MovieDBMoviesResonse, Movies } from "../interface/movieInterface";

interface MoviesState {
  nowPlaying: Movies[];
  popular: Movies[];
  topRated: Movies[];
  upcoming: Movies[];
}

export const useMovies = () => {
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = () => {
    setIsLoading(true);

    const popularPromise = movieDB.get<MovieDBMoviesResonse>('/popular');
    const nowPlayingPromise = movieDB.get<MovieDBMoviesResonse>('/now_playing');
    const topRatedPromise = movieDB.get<MovieDBMoviesResonse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDBMoviesResonse>('/upcoming');

    const response = Promise.all([popularPromise, nowPlayingPromise, topRatedPromise, upcomingPromise]);
    response.then(res => {
      setMoviesState({
        nowPlaying: res[0].data.results,
        popular: res[1].data.results,
        topRated: res[2].data.results,
        upcoming: res[3].data.results
      });
      setIsLoading(false);
    })

  };
  useEffect(getMovies, []);

  return {
    ...moviesState,
    isLoading,
  }
}
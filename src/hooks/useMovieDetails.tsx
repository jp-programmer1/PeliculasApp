import React, { useState, useEffect, useCallback} from "react";
import movieDB from "../api/movieDB";
import { Cast, CreditsResponse } from "../interface/creditsInterface";
import { MovieFull } from "../interface/movieInterface";

interface MovieDetails {
  isLoading: boolean;
  cast: Cast[];
  movieFull?: MovieFull;
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: []
  });

  const getMovieDetail = useCallback(() => {
    const infoMoviePromise = movieDB.get<MovieFull>(`/${movieId}`);
    const creditsMoviePromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);
    let prom = Promise.all([infoMoviePromise, creditsMoviePromise]);
    prom.then(res => {
      setState({
        isLoading: false,
        movieFull: res[0].data,
        cast: res[1].data.cast
      });
    })
  }, [movieId]);

  useEffect(getMovieDetail, []);

  return { ...state };
}

import { useEffect, useState } from 'react';
import { MovieDBResponse, Movie } from '../interfaces/movieInterface';
import movieDB from "../api/movieDB";
import seriesDB from '../api/seriesDB';

interface MoviesState {
    nowPlaying: Movie[],
    popular: Movie[],
    topRated: Movie[]
    upComing: Movie[],
    popularTV: Movie[],
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [movieState, setMovieState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upComing: [],

        popularTV: [],
    });

    const getMovies = async () => {
        const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing');
        const popularPromise = movieDB.get<MovieDBResponse>('/popular');
        const topRatedPromise = movieDB.get<MovieDBResponse>('/top_rated');
        const upComingPromise = movieDB.get<MovieDBResponse>('/upcoming');
        const popularTvPromise = seriesDB.get<MovieDBResponse>('popular');

        const response = await Promise.all([nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upComingPromise,
            popularTvPromise
        ]);

        setMovieState({
            nowPlaying: response[0].data.results,
            popular: response[1].data.results,
            topRated: response[2].data.results,
            upComing: response[3].data.results,

            popularTV: response[4].data.results,
        })

        setIsLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, []);

    return {
        ...movieState,
        isLoading
    }
}
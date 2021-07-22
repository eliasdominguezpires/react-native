import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';

import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterfaces';

interface MoviesDetailsState {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMoviesDetails = (movieId: number) => {

    const [state, setState] = useState<MoviesDetailsState>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async () => {
        const movieDetailPromise = movieDB.get<MovieFull>(`/${movieId}`);
        const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

        const [movieDetailResp, castResp] = await Promise.all([movieDetailPromise, castPromise])

        setState({
            isLoading: false,
            movieFull: movieDetailResp.data,
            cast: castResp.data.cast
        })
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
}
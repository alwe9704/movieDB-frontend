import axios from 'axios';
import { MovieSearchResult, MovieDetails, Video, MovieVideoDetails } from '../models/MovieModels';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

const api_string = 'api_key=b60da710fb69e88a59ee89dba4f2bb11';

interface SearchResult {
    page: number,
    results: MovieSearchResult[]
};


const getMovies = async () => {
    return await (await instance.get<SearchResult>(`movie/popular?${api_string}&language=en-US&page=1`)).data.results;
}

const getMovieDetails = async (id: string) => {
    return await (await instance.get<MovieDetails>(`movie/${id}?${api_string}&language=en-US`)).data;
}

const getMovieVideos = async(id: string) => {
    return await (await instance.get<MovieVideoDetails>(`movie/${id}/videos?${api_string}&language=en-US`)).data.results;
}


export default {
    getMovies: getMovies,
    getMovieDetails: getMovieDetails,
    getMovieVideos: getMovieVideos
}
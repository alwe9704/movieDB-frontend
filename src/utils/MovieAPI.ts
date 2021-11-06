import axios from 'axios';
import { MovieSearchResult, MovieDetails, Video, MovieVideoDetails, Crewmember } from '../models/MovieModels';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

const api_string = 'api_key=b60da710fb69e88a59ee89dba4f2bb11';

interface SearchResult {
    page: number,
    results: MovieSearchResult[]
};
interface Crewresult {
    page: number,
    cast: Crewmember[]
};


export default {
    getPopularMovies: async () => { return await (await instance.get<SearchResult>(`movie/popular?${api_string}&language=en-US&page=1`)).data.results; },
    getMovieDetails: async (id: string) => { return await (await instance.get<MovieDetails>(`movie/${id}?${api_string}&language=en-US`)).data; },
    getMovieVideos: async(id: string) => { return await (await instance.get<MovieVideoDetails>(`movie/${id}/videos?${api_string}&language=en-US`)).data.results; },
    searchMovies: async (searchTerm: string) => { return await (await instance.get<SearchResult>(`search/movie?${api_string}&query=${searchTerm}`)).data.results; },
    getCrew: async (id: string) => { return await (await instance.get<Crewresult>(`movie/${id}/credits?${api_string}&language=en-US`)).data.cast; }
};
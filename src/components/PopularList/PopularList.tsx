import { CircularProgress, Slider, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { MovieDetails, MovieSearchResult } from '../../models/MovieModels';
import MovieAPI from '../../utils/MovieAPI';
import PopularItem from '../PopularItem/PopularItem';

import './PopularList.scss';

const ratingsOptions = Array.from(Array(100).keys()).map(x => x/10);

const PopularList = () => {

    const [ratings, setRatings] = useState<number[]>([0, 10]);
    const [searching, setSearching] = useState(true);

    const [movies, setMovies] = useState<MovieSearchResult[]>([]);
    const [visibleMovies, setVisibleMovies] = useState<MovieSearchResult[]>([]);
    const [popularMovies, setPopularMovies] = useState<MovieSearchResult[]>([]);

    useEffect(() => {
        MovieAPI.getPopularMovies().then(response => {
        setMovies(response);
          setVisibleMovies(response);
          setPopularMovies(response);
          setSearching(false);
        }).catch(error => {
            console.log(error);
        })
      }, [])


    const searchTermChange = async (searchTerm: string) => {
        if (searchTerm === "") {
            setMovies(popularMovies);
        } else {
            await setSearching(true);
            await setMovies(await MovieAPI.searchMovies(searchTerm));
            await filterMovies(ratings);
            await setSearching(false);
        }
    }
    const ratingRangeChange = async (event: Event, newValue: number | number[]) => {
        const useVal = newValue as number[];
        setRatings(useVal);
        filterMovies(useVal);
    }

    const filterMovies = async (r: number[]) => {
        await setVisibleMovies(movies.filter(m => m.vote_average >= r[0] && m.vote_average <= r[1]));
    }

    return (
        <div className='popular'>
            {
                popularMovies.length != 0 ? 
                    <div className="header" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${popularMovies[0].backdrop_path})`}}>
                        <h1>MicroAA MovieDB</h1>
                    </div> : 
                    <div>

                    </div>
            }
        
            <div className="form">
                <h1>Popular Movies</h1>
                <TextField 
                    id="outlined-basic" 
                    label="Search Movies By Name" 
                    variant="outlined" 
                    onChange={e => searchTermChange(e.target.value)}
                />
                <div>
                    <h3>MovieDB Ratings</h3>
                    <Slider
                        value={ratings}
                        onChange={ratingRangeChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10}
                    />
                </div>
                
            </div>
            {
                searching ?
                    <CircularProgress />
                    :
                    <div className="movies">
                        {visibleMovies.map(movie => {
                            return <PopularItem key={movie.id} movie={movie}/>
                        })}
                    </div>
            }
        </div>
    );
}
export default PopularList;

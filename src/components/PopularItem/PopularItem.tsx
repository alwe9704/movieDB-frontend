import React from 'react';
import { Link } from 'react-router-dom';
import { MovieSearchResult } from '../../models/MovieModels';
import './PopularItem.scss';

interface Props {
    movie: MovieSearchResult
}
const PopularItem = ({movie} : Props) => {
    return (
        <Link className={'movie'} to={`movies/${movie.id}`}>
            {
                movie.poster_path == null ? 
                <div className="no-poster">
                    <h3>{
                        movie.title.length > 30 ?
                            movie.title.substring(0, 30)+"..."
                            : movie.title    
                    }</h3>
                </div>
                :
                <div className="poster" style={
                    {
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`
                    }
                }></div>
            }
           
        </Link>
    );
}

export default PopularItem;
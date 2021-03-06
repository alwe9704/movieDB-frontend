import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Crewmember, MovieDetails, Video } from '../../models/MovieModels';
import MovieAPI from '../../utils/MovieAPI';

import './MovieDetailsPage.scss';

const MovieDetailsPage = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState<MovieDetails>();
    const [videos, setVideos] = useState<Video[]>([]);
    const [crew, setCrew] = useState<Crewmember[]>([]);

    useEffect(() => {
        const useId = id as string;
        Promise.all([
            MovieAPI.getMovieDetails(useId),
            MovieAPI.getMovieVideos(useId),
            MovieAPI.getCrew(useId)
        ]).then(response => {
            Promise.all([
                setMovie(response[0]),
                setVideos(response[1]),
                setCrew(response[2])
            ]).then(r => {
                setLoading(false);
            })
        })
    }, [id]);
    return <div className="movie-details-page">
        {
            loading ? <CircularProgress />
            : <div>
                <div className="cover"
                style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie!.backdrop_path})`}}
                >
                    <h1>{movie!.title}</h1>
                </div>
                <div className="info">
                    <div>
                        <h2>Genrer:</h2>
                        {movie!.genres.map(x => <div key={x.id}>{x.name}</div>)}
                    </div> 
                    <div>
                        <h2>Beskrivning:</h2>
                        <div>{movie!.overview}</div>
                    </div> 
                    <div>
                        <h2>Skådespelare</h2>
                        <div className="actors">
                            {crew.map(member => {
                                return (<div key={member.id} className="actor">
                                    <div 
                                        className="image" 
                                        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w200/${member.profile_path})`}}/>
                                    <h3>{member.name}</h3>
                                </div>)
                            })}
                        </div>
                    </div>
                    <div className="trailer">
                        {
                            videos.length > 0 ? 
                                <iframe
                                    width="100%"
                                    height="600px"
                                    src={`https://www.youtube.com/embed/${videos[0].key}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded youtube"
                                />
                            : <div>Ingen trailer</div>
                        }
                    </div>
                </div>
            </div>
        }
    </div>
}
export default MovieDetailsPage;
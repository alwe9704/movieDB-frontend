import React, { useEffect, useState } from 'react';
import MovieAPI from './utils/MovieAPI';
import { MovieSearchResult, MovieDetails } from './models/MovieModels';

function App() {

  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [movie, setMovie] = useState<MovieDetails>();


  useEffect(() => {
    MovieAPI.getMovies().then(response => {
      console.log(response);
      setMovies(response);
    }).catch(error => {
        console.log(error);
    })

    MovieAPI.getMovieDetails('550').then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });

    MovieAPI.getMovieVideos('550').then(response => {
      console.log(response);
    });
    
  }, [])

  return (
    <div className="App">
      <h2>Test</h2>
    </div>
  );
}

export default App;

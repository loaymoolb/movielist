import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';

import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com?apikey=978faa9e";

const movie1 = {
    "Title": "The Great Gatsby",
    "Year": "2013",
    "imdbID": "tt1343092",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTkxNTk1ODcxNl5BMl5BanBnXkFtZTcwMDI1OTMzOQ@@._V1_SX300.jpg"
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  return (
    <div className="app">
      <h1>Movielist</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
    </div>
  );
}

export default App;
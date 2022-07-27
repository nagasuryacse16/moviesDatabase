import React from 'react';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg'
//1c7d5230
const API_URL = 'http://www.omdbapi.com?apikey=1c7d5230';

const App = () =>{
    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    /*The async keyword turns a method into an async method, which allows you to use the await keyword in its body.
     When the await keyword is applied, it suspends the calling method and yields control back to its caller until the awaited task is complete. await can only be used inside an async method.*/
    const searchMovies=async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data=await response.json();
        setMovies(data.Search);
    }

    useEffect(()=>{
            searchMovies('spiderman');
    },[]); //empty dependency, means that the hook will only trigger once when the component is first rendered.

    return(
    <div className='app'>
        <h1>MovieLand</h1>
        
        <div className='search'>
            <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <img
                src={SearchIcon}
                alt='search'
                onClick={() => {searchMovies(searchTerm)}}
            />
        </div>
        {movies?.length > 0 ? ( 
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
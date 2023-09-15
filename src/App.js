import { useState } from "react";
import Navbar , {Search,NumResults} from "./components/Navbar";
import ListBox from "./components/ListBox";
import MovieList from "./components/Movies";
import WatchedSummary from "./components/WatchedMoviesSummary";
import WatchedMovieList from "./components/WatchedMovies";
import Main from "./components/Main";
import { useEffect } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "f099808";

export default function App() {
  
  const [query, setQuery] = useState("fighxxxt");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchMovies() {
          try{
            setIsLoading(true);
            setError("");
  
            const res = await fetch(
              `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            );

            if(!res.ok){
              throw new Error('Something went wrong when fetching the movies')
            }


            const data = await res.json();

            if(data.Response === 'False'){
              throw new Error(`No movies could be found for : ${query}`)
            }
            setMovies(data.Search)
            console.log(data.Search)

          }catch(error){
            setError(error.message)
          }finally{
            setIsLoading(false);

          }

      
      }
      fetchMovies()
    },[]);

  return (
    <>
      <Navbar>
        <Search/>
        <NumResults movies={movies}/>
      </Navbar>

      <Main>

        <ListBox>
          {isLoading?<Loader/>: error? <ErrorMessage message={error}/> :<MovieList movies={movies} />}
        </ListBox>

        <ListBox>
          <WatchedSummary watched={watched}/>
          <WatchedMovieList watched={watched} />
        </ListBox>

      </Main>

    </>
  );
}


function Loader (){
  return <p className="loader">LOADING</p>
}

function ErrorMessage ({message}){
  return <p className="error">{message}</p>
}
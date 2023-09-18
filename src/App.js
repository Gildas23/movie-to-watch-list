import { useState } from "react";
import Navbar, { Search, NumResults } from "./components/Navbar";
import ListBox from "./components/ListBox";
import MovieList from "./components/Movies";
import WatchedSummary from "./components/WatchedMoviesSummary";
import WatchedMovieList from "./components/WatchedMovies";
import Main from "./components/Main";
import { useEffect } from "react";
import StarRating from "./components/StarRating";

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

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY = "f099808";

export default function App() {
  const [query, setQuery] = useState("peaky");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((currentlySelectedId) =>
      currentlySelectedId === id ? null : id
    );
  }

  function handleCloseMovieDetails() {
    setSelectedId(null);
  }

  function handleAddMovieToWatched(movie){
    setWatched(watchedMovies=>[...watchedMovies,movie])
  }

  function handleRemoveMovie(id){
    setWatched((watched)=>watched.filter(movie=>movie.imdbID !== id))

  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong when fetching the movies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error(`No movies could be found for : ${query}`);
          }

          // console.log(data);
          setMovies(data.Search);
          // console.log(data.Search);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Search setQuery={setQuery} query={query} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <ListBox>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
        </ListBox>

        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovieDetails}
              onAddWatched={handleAddMovieToWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} onRemoveMovie={handleRemoveMovie}/>
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">LOADING</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function MovieDetails({ selectedId, onCloseMovie,onAddWatched,watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error,setError] = useState()
  const [userRating,setUserRating] = useState(null)
  const isMovieInwatchedList = watched.map((movie)=>movie.imdbID).includes(selectedId)
  const previousUserRating = watched.find((movie=>movie.imdbID))?.userRating


  function handleAdd(){

    const {Title,Year,Poster,imdbRating,Runtime} = movie
    onAddWatched({userRating,Title,Year,Poster,imdbRating,imdbID:selectedId,runtime:Number(Runtime.split(' ').at(0))})
    onCloseMovie()
  }

  useEffect(function () {
    async function getMovieDetails() {
      setIsLoading(true)
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong while fetching");
        }

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        setError(error.message)
        console.log(error);
      }finally{
        setIsLoading(false)
      }
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(function(){
    if(!movie.Title){
      return ;
    }
    document.title = `Movie |${movie.Title}`
  },[movie])


  return (
    <div className="details" >
      {
        isLoading? <Loader/>: error? <ErrorMessage error={error}/> :<>
        <header>
        <button className="btn-back" onClick={(e) => onCloseMovie()}>
          &larr;
        </button>
        <img src={movie.Poster} alt={`Poster of ${movie.movie}`}></img>
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>{movie.Released} &bull; {movie.runtime}</p>
          <p>{movie.Genre}</p>
          <p>
            <span></span>
            {movie.imdbRating} IMDB rating
          </p>
        </div>
      </header>

      <section>
      <div className="rating">
      {
        isMovieInwatchedList?
        <>
        <p>You rated this movie {previousUserRating} <span>⭐</span> out of 10</p>
         
        </>
        :<>
        <StarRating maxRating={10} size={24} onRatingSet={setUserRating} />
        {userRating > 0 && <button className="btn-add" onClick={handleAdd}>Add to watched list</button>}
        
        </>
      }
   
      </div>
        <p><em>{movie.Plot}</em></p>
        <p>Starring {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
      </section>
        </>
      }
      
    </div>
  );
}

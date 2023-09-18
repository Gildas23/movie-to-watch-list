export function WatchedMovieListItem({movie,onRemoveMovie}){
    return (
      <li >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={()=>onRemoveMovie(movie.imdbID)}>&times;</button>
      </div>
    </li>
    )
  }
  
  export default function WatchedMovieList({watched,onRemoveMovie}){
  
    return (
          <ul className="list">
            {watched.map((movie) => (
              <WatchedMovieListItem movie={movie} key={movie.imdbID} onRemoveMovie={onRemoveMovie}/>
            ))}
          </ul>
    )
  }
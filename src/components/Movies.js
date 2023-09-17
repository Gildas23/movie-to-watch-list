export function MovieListItem({movie,handleSelectMovie}){
    return (
      <li onClick={e=>handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
    )
  }
  
  export default function MovieList({movies,handleSelectMovie}){
  
    return <>
    <ul className="list list-movies">{movies?.map((movie)=><MovieListItem movie={movie} key={movie.imdbID} handleSelectMovie={handleSelectMovie}/>)}
        </ul>
    </>
          
    
  }
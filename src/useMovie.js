
import { useState,useEffect } from "react";
export function useMovie(query){
    const KEY = "f099808";

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(    

        function () {
        // callback?.()

          const controller = new AbortController();
          async function fetchMovies() {
            try {
              setIsLoading(true);
              setError("");
    
               
              const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal}
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
              setError("")
            } catch (error) {
              if(error.name !== "AbortError"){
              setError(error.message);
            }
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
          
    
          return function(){
            controller.abort()
          }
        },
        [query]
      );

      return {movies,isLoading,error}
}
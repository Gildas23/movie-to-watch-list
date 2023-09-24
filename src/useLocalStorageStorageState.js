import { useState,useEffect } from "react";

export function useLocalStorageState(initialState,keyName){

const [value, setValue] = useState(function(){

    const storedWatchedMovies = JSON.parse(localStorage.getItem(keyName))
    
    return storedWatchedMovies?storedWatchedMovies:initialState
  });

  useEffect(function(){
    localStorage.setItem(keyName,JSON.stringify(value))
  },[value,keyName])

  return [value,setValue]
}
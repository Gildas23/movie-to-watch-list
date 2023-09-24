// import { useState } from "react";
import { useEffect, useRef } from "react"
export function Logo(){
    return (
      <div className="logo">
      <span role="img">🍿</span>
      <h1>My movie watch List</h1>
      <span role="img">💻</span>
  
    </div>
    )
  }
  
  export function Search({query,setQuery}){
    const searchInput = useRef(null)

    useEffect(function(){

      function callback(e){
        if(document.activeElement === searchInput.current) return ;
         if(e.code === "Enter"){
             setQuery("")
             searchInput.current.focus()
            }
        }

      document.addEventListener("keydown",callback)

      // cleanup function  
      return function(){
        document.removeEventListener('keydown',callback)
      }

    },[setQuery])

    return (
      <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInput}
    />
    )
  }
  
  export function NumResults({movies}){
    return    (<p className="num-results">
    Found <strong>{movies.length}</strong> results
  </p>)
  }
  
  export default function Navbar({children}){
  
    return (
      <nav className="nav-bar">
      <Logo/>
      {children}
    </nav>
    )
  }
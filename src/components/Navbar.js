// import { useState } from "react";
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
    return (
      <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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
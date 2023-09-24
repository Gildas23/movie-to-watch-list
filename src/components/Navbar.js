// import { useState } from "react";
import { useEffect, useRef } from "react";
import { useKey } from "../useKey";
export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>My movie watch List</h1>
      <span role="img">💻</span>
    </div>
  );
}

export function Search({ query, setQuery }) {
  const searchInput = useRef(null);
  
  function callback() {
    if (document.activeElement === searchInput.current) return;
    setQuery("");
    searchInput.current.focus();
  }

  useKey("Enter", callback);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInput}
    />
  );
}

export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

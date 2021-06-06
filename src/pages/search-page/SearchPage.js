import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// components
import MovieCard from "../../components/movie-card/MovieCard";
import Header from "../../components/header/Header";

function SearchPage(props) {
  const location = useLocation();
  const param = location.state.name;
  console.log(param, "SearchPage");
  const [movies, setMovies] = useState("");

  console.log(param, "SearchPage");

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=9feb28ca7a3b56eb25653dabf22373a9&query=${param}`;
  useEffect(() => {
    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);

        console.log(data.results, "search PAGE");
      });
  }, []);
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center">
          {movies.length &&
            movies.map((movie, index) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
        </div>
      </div>
    </>
  );
}

export default SearchPage;

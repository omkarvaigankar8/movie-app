import React, { useState, useEffect } from "react";
//component
import MovieCard from "../../components/movie-card/MovieCard";
import "./Home.css";
import Carousel from "../../components/carousel/Carousel";
import Loader from "../../components/loader/Loader";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";

const nowPlaying =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=9feb28ca7a3b56eb25653dabf22373a9&language=en-US&page=1";

const MovieList = () => {
  const [movies, setMovies] = useState("");
  const [movieType, setMovieType] = useState("popular");
  const [moviesNow, setMoviesNow] = useState("");
  const [loading, setLoading] = useState(false);
  let apiLink = `
  https://api.themoviedb.org/3/movie/${movieType}?api_key=9feb28ca7a3b56eb25653dabf22373a9&language=en-US&page=1`;
  useEffect(() => {
    setLoading(true);
    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
    //  Carousel now Playing
    fetch(nowPlaying)
      .then((res) => res.json())
      .then((data) => {
        setMoviesNow(data.results);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [movieType]);
  return (
    <div className="container-fluid">
      {loading && <Loader loading={loading} />}
      <Header />
      <Search />
      <Carousel movies={moviesNow} />
      <div className="section-listing custom-container d-flex justify-content-between">
        <div className="heading-section">
          <h1 className="mb-0">Movie Listing</h1>
        </div>
        <div className="filter-section d-flex justify-content-between align-items-center">
          <h4 className="me-2 mb-0">Sort By :</h4>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setMovieType(e.target.value)}
          >
            <option defaultValue="popular" value="popular">
              Popular
            </option>
            <option value="upcoming">Upcoming</option>
            <option value="top_rated">Top Rated</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        {movies &&
          movies.length &&
          movies.map((movie, index) => {
            return <MovieCard key={movie.id} {...movie} />;
          })}
      </div>
    </div>
  );
};

export default MovieList;

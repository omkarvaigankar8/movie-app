import React from "react";
import { Link, useHistory } from "react-router-dom";
import star from "../../Images/star.svg";
import "./MovieCard.css";
const Poster_Link = "https://image.tmdb.org/t/p/w300";

const MovieCard = ({ title, poster_path, vote_average, id }) => {
  const history = useHistory();
  const redirectHandler = () => {
    // console.log("JAM", id);
    history.push({
      pathname: "/movie",
      state: { id },
    });
    // historyData.push(
    //   pathname: '/search',
    //               state: { searchHome: searchHome },
    //   {
    //     // location state
    //     name: id,
    //   }
    //   //   search: `${search}`,
    // );
  };

  return (
    <div className="movie-card">
      {/* <Link to={`/movie/${id}`}> */}
      <img
        src={
          poster_path
            ? Poster_Link + poster_path
            : "https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg"
        }
        alt={title}
        className="img-fluid poster-img"
        onClick={() => redirectHandler()}
      />
      <div className="movie-info d-flex justify-content-between align-items-center">
        <h5>{title}</h5>
        <span className="d-flex justify-content-center align-items-center">
          <img className="star-icon icons" src={star} />
          {vote_average}
        </span>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default MovieCard;

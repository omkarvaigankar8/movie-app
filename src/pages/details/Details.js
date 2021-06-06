import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//  styles

import "./Details.css";
// Components
import ReactPlayer from "react-player";
import Carousel from "../../components/carousel/Carousel";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import star from "../../Images/star.svg";
import youtubeIcon from "../../Images/youtube.svg";

function Details({}) {
  const location = useLocation();

  const myparam = location.state;
  console.log("useLocation", myparam);

  const getDetails = `https://api.themoviedb.org/3/movie/${myparam.id}?api_key=9feb28ca7a3b56eb25653dabf22373a9&language=en-US`;
  const getSimilar = `https://api.themoviedb.org/3/movie/${myparam.id}/similar?api_key=9feb28ca7a3b56eb25653dabf22373a9&language=en-US&page=1`;
  const getCast = `https://api.themoviedb.org/3/movie/${myparam.id}/credits?api_key=9feb28ca7a3b56eb25653dabf22373a9&language=en-US`;
  const youTubeURL = `https://api.themoviedb.org/3/movie/${myparam.id}/videos?api_key=9feb28ca7a3b56eb25653dabf22373a9&language=en-US`;
  const youTubeVideoURL = "https://www.youtube.com/watch?v=";
  const [details, setDetails] = useState("");
  const [similar, setSimilar] = useState("");
  const [videoURL, setVideoURL] = useState();
  const [cast, setCast] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const posterImage = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    setLoading(true);
    fetch(getDetails)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        console.log(data, "details");
      });

    // Casts
    fetch(getCast)
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast);

        console.log(data.cast);
      });

    // Similar Movies

    console.log("Use Effect Called");
    fetch(getSimilar)
      .then((res) => res.json())
      .then((data) => {
        setSimilar(data.results);
      });
    setLoading(false);
  }, [myparam && myparam.id]);

  // Youtube Trailer
  const watchTrailer = () => {
    fetch(youTubeURL)
      .then((response) => response.json())
      .then((data) => {
        setVideoURL(youTubeVideoURL + data.results[0].key);
        openModal();
        console.log(
          "Video Playing : results",
          youTubeVideoURL + data.results[0].key
        );
      });
  };
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  let actors = null;
  actors =
    cast &&
    cast.length &&
    cast
      .filter((i, index) => index < 4)
      .map((actor, index) => {
        return (
          <h6 className="actor-name" key={actor.id}>
            {actor.name}
          </h6>
        );
        console.log(actor.name, "Actors");
      });

  // disabled button
  const setDisabled = (details) => {
    if (details <= 0) {
      return "disabled";
    } else {
      return " ";
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <Header />

      <div className="custom-container-details my-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3  col-md-3 text-center mb-4">
            <img
              src={
                details.poster_path
                  ? posterImage + details.poster_path
                  : "https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg"
              }
              className="img-fluid poster-img"
            />
          </div>
          <div className="col-sm-12  col-lg-9  col-md-9 ps-5 details-box">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="movie-title heading-section ">
                <h1>{details.title}</h1>
              </div>
              <span className="d-flex justify-content-center align-items-center">
                <img className="star-icon icons" src={star} />
                {details.vote_average}
              </span>
            </div>
            <div className="movie-overview mb-4">
              <p>{details.overview}</p>
            </div>
            <div className="runtime mb-4">
              <h4>Duration</h4>
              <p>{details.runtime} minutes</p>
            </div>
            <div className="actors-section mb-4">
              <h4 className="mb-2">Starring</h4>
              <div className="actor-cast d-flex">{actors}</div>
            </div>

            <button
              className={`btn button ${setDisabled(details.poster_path)}`}
              onClick={watchTrailer}
            >
              <span className="span-btn">
                Watch Trailer <img src={youtubeIcon} className="youtubeIcon" />
              </span>
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="backdrop"
          onClick={() => {
            setShowModal((prev) => !prev);
          }}
        >
          <div className="player-wrapper container">
            <ReactPlayer
              url={videoURL}
              className="react-player"
              playing
              width="100%"
              height="100%"
              controls={false}
            />
          </div>
        </div>
      )}
      <Carousel movies={similar} />
    </>
  );
}

export default Details;

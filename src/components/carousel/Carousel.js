import React from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Controller, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/swiper-bundle.css";
import "./Carousel.css";
SwiperCore.use([Navigation, Pagination, Thumbs, Controller]);

const Poster_Link = "https://image.tmdb.org/t/p/w300";

const Carousel = (props) => {
  const slides = [];
  console.log(props, "from Carousel : PROPS");
  const history = useHistory();
  const redirectHandler = (id) => {
    console.log("JAM Carousel", id);
    history.push({
      pathname: "/movie",
      state: { id },
    });
  };

  return (
    <div>
      <Swiper
        breakpoints={{
          320: {
            width: 320,
            slidesPerView: 2,
          },
          360: {
            width: 360,
            slidesPerView: 2,
          },
          576: {
            width: 576,
            slidesPerView: 3,
          },
          768: {
            width: 768,
            slidesPerView: 4,
          },
          991: {
            width: 991,
            slidesPerView: 5,
          },
        }}
        tag="section"
        wrapperTag="ul"
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={8}
        loop={true}
        onInit={(swiper) => console.log("Swiper initialization")}
        onSlideChange={(swiper) =>
          console.log("Slide Change to :", swiper.activeIndex)
        }
        onReachEnd={(swiper) => console.log("End reached")}
        id="main"
      >
        {props.movies.length !== 0 &&
          props.movies &&
          props.movies.map((movie) => (
            <SwiperSlide key={movie.id} tag="li">
              <img
                className="img-fluid carousel-img"
                src={Poster_Link + movie.poster_path}
                alt={movie.title}
                onClick={() => redirectHandler(movie && movie.id)}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

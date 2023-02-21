import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
import { useGlobalContext } from "./context";
import useFetch from "./useFetch";

const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const { id } = useParams();
  let single = true;

  const { loading, error, data: movie } = useFetch(id, single);

  if (loading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          home
        </Link>
      </div>
    );
  }

  // useEffect(() => {}, []);
  const {
    poster_path: poster,
    original_title: title,
    overview: plot,
    release_date: year,
    backdrop_path: image,
    genres: genre,
  } = movie;

  let imageUrl = null;

  if (image || poster) {
    imageUrl = image
      ? `https://image.tmdb.org/t/p/original${image}`
      : `https://image.tmdb.org/t/p/original${poster}`;
  }

  return (
    <section className="single-movie">
      <img src={imageUrl || url} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <div className="genres">
          {genre.map((item) => {
            const { id, name } = item;
            return <p key={id}>{name}</p>;
          })}
        </div>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" className="btn">
          back
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;

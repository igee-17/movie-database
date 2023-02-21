import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import { useGenres } from "./useFetch";
import { useEffect } from "react";

const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
  const { movies, newMovies, loading, genre, setNewMovies } =
    useGlobalContext();

  const { genres } = useGenres();

  // console.log(newMovies);

  useEffect(() => {
    if (genre !== "All") {
      const genreId = genres?.find((item) => item.name === genre);

      const movieList = movies?.filter((item) => {
        const { genre_ids } = item;

        const isPresent = genre_ids.find((id) => id === genreId?.id);
        return isPresent;
      });
      setNewMovies(movieList);
    } else {
      setNewMovies(movies);
    }
  }, [genre]);

  useEffect(() => {
    setNewMovies(movies);
  }, [movies]);

  if (loading) {
    return <div className="loading"></div>;
  }

  // if (newMovies.length < 1) {
  //   return <div className="no-movies">No movie to display...</div>;
  // }

  return (
    <section className="movies">
      {newMovies.length < 1 && (
        <div className="no-movies">
          <p>No movies found...</p>
        </div>
      )}
      {newMovies?.map((item, index) => {
        const {
          original_title: title,
          id,
          backdrop_path: image,
          poster_path: poster,
          Year: year,
        } = item;

        let imageUrl = null;

        if (image || poster) {
          imageUrl = image
            ? `https://image.tmdb.org/t/p/original${image}`
            : `https://image.tmdb.org/t/p/original${poster}`;
        }

        return (
          <Link to={`/movies/${id}`} key={id} className="movie">
            <article>
              <img src={imageUrl || url} alt={title} />
              <div className="movie-info">
                <h4 className={title}>{title}</h4>
                <p>{year}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default Movies;

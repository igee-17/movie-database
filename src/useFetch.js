import React, { useState, useContext, useEffect } from "react";
import { useGlobalContext } from "./context";
// export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
export const API_ENDPOINT = `
https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`;

// export
const useFetch = (urlParams, single) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [data, setData] = useState(null);
  const fetchMovies = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setData(data.results || data);

        setError({ show: false, msg: "" });
      } else if (single) {
        setData(data);
      } else {
        setError({ show: true, msg: data.Error });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!single) {
      if (urlParams.length > 0) {
        fetchMovies(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${urlParams}`
        );
      } else {
        fetchMovies(`${API_ENDPOINT}`);
      }
    } else {
      fetchMovies(
        `https://api.themoviedb.org/3/movie/${urlParams}?api_key=5b215017ffd258cad8ed310e8aaadd76`
      );
    }
  }, [urlParams]);
  return { loading, error, data, setLoading, setError, setData };
};

export const useGenres = () => {
  const [data, setData] = useState([]);

  const getGenres = async () => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
      );
      const data = await resp.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return data;
};

export default useFetch;

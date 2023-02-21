import React, { useState, useContext } from "react";
import useFetch from "./useFetch";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let single = false;
  const {
    loading,
    error,
    data: movies,
    setLoading,
    setError,
    setData,
  } = useFetch(`${query}`, single);

  const [newMovies, setNewMovies] = useState([]);

  const handleFilterButtonClick = () => {
    if (!startDate || !endDate) return;

    const filteredMovies = movies.filter((movie) => {
      return movie.release_date >= startDate && movie.release_date <= endDate;
    });
    // const filteredMovies = newMovies.filter((movie) => {
    //   return movie.release_date >= startDate && movie.release_date <= endDate;
    // });
    setNewMovies(filteredMovies);
  };

  const clearFilters = async () => {
    setQuery("");
    setGenre("");
    setStartDate("");
    setEndDate("");
    // const { data: movies } = useFetch(`${query}`, single);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
      );
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

  return (
    <AppContext.Provider
      value={{
        loading,
        error,
        movies,
        query,
        setQuery,
        genre,
        setGenre,
        newMovies,
        setNewMovies,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        handleFilterButtonClick,
        clearFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

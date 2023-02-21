import React from "react";
import { useState } from "react";
import { useGlobalContext } from "./context";
import { useGenres } from "./useFetch";

const SearchForm = () => {
  const {
    query,
    setQuery,
    error,
    genre,
    setGenre,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFilterButtonClick,
    clearFilters,
  } = useGlobalContext();

  const { genres } = useGenres();

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>search movies</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <select
        name="genres"
        id="genres"
        className="genresForm"
        value={genre}
        onChange={(e) => {
          setGenre(e.currentTarget.value);
        }}
      >
        <option hidden>Filter genre...</option>
        <option>All</option>
        {genres?.map((item) => {
          const { id, name } = item;
          return <option key={id}>{name}</option>;
        })}
      </select>

      <div className="date-filter">
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={handleStartDateChange}
        />

        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={handleEndDateChange}
        />

        <button onClick={handleFilterButtonClick}>Filter</button>
      </div>
      <button onClick={clearFilters} className="clear-filters">
        Clear Filters
      </button>
      {error.show && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;

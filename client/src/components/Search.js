 
import React, { useState } from "react";
import axios from "axios";
import AnimeList from "./AnimeList";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults)
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    // Perform search with the search term as the value
    const searchCriteria = `https://api.jikan.moe/v4/anime?q=${searchTerm}`;

    axios
      .get(searchCriteria)
      .then((response) => {
        setSearchResults(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setSearchResults([]);
      });

    setSearchTerm("");
  };

  return (
    <div className="container">
      <div className="searchform-container">
      <form onSubmit={handleSubmit} className="searchform">
        <input
          className="searchbar"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter Anime"
        />
        <button type="submit" className="searchbutton">
          Submit
        </button>
      </form>

      </div>
    
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((props) => (
            <div className="anime-content">
              <AnimeList key={props.mal_id} props={props} />
            </div>
          ))
        ) : (
          <p className="searchTip">please enter search criteria</p>
        )}
      </div>
    </div>
  )
}

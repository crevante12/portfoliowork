import React, { useState } from "react";
import axios from "axios";
import GameList from "./GameList";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    // Perform search with the search term as the value
    const apiKey = "f39c9b8cede9423f89a292e20984c2e4";
    const searchCriteria = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`;

    axios
      .get(searchCriteria)
      .then((response) => {
        setSearchResults(response.data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setSearchResults([]);
      })
      .finally(() => {
        setIsLoading(false);
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
            placeholder="Search your favorite game"
          />
          <button type="submit" className="searchbutton">
            Submit
          </button>
        </form>
      </div>

      <div>
        {isLoading ? (
          <p className="searchTip">Looking For Your Title, Please Wait!...</p>
        ) : searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div className="anime-content" key={item.id}>
              <GameList item={item} />
            </div>
          ))
        ) : (
          <p className="searchTip">Please Search For Your Favorite Game Title</p>
        )}
      </div>
    </div>
  );
}

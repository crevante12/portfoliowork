import React from "react";

const GameList = ({ item }) => {
  return (
    <div className="game-card">
      <img src={item.background_image} alt={item.name} />
      <h1 className="game-title">{item.name}</h1>
      <p className="game-description">Release Date: {item.released}</p>
      <p className="game-rating">Rating: {item.rating}</p>
    </div>
  );
};

export default GameList;

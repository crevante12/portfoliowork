import React from "react";
 

const AnimeList = ({ props }) => {
  return (
    <div className="anime-card">
      <img src={props.images.jpg.image_url}/>
      <h1 className="anime-title">{props.title}</h1>
      <p className="anime-synopsis">{props.synopsis}</p>

    
    </div>
  );
};

export default AnimeList;


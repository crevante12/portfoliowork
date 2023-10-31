import React, { useState } from 'react';
import AddGameForm from './AddGameForm.jsx';

export default function GameData(props) {
  const { title, comment, rating, _id } = props;
  const [editToggle, setEditToggle] = useState(false);

  return (
    <div className="game-card">
      {!editToggle ? (
        <>
          <h1> Title:  {title}</h1>
          <p> Comment: {comment}</p>
          <p> Personal Rating is: {rating}</p>
          <button className="delete-btn" onClick={() => props.deleteGame(_id)}>
            Delete
          </button>
          <button
            className="edit-btn"
            onClick={() => setEditToggle((prevToggle) => !prevToggle)}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <AddGameForm
            title={title}
            comment={comment}
            btnText="Submit Edit"
            _id={_id}
            submit={props.editGame}
          />
          <button onClick={() => setEditToggle((prevToggle) => !prevToggle)}>
            Close
          </button>
        </>
      )}
    </div>
  );
}

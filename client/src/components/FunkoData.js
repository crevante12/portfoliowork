import React, { useState } from 'react';

export default function FunkoData({
  _id,
  title,
  description,
  imgUrl,
  deleteFunko,
  editFunko,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ title, description, imgUrl });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    // Call the editFunctionfunction to update the funko with the new data
    editFunko(_id, editedData);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="issue-container">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editedData.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            value={editedData.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="imgUrl"
            value={editedData.imgUrl}
            onChange={handleInputChange}
          />
          <button className="save-btn" onClick={handleSaveEdit}>Save</button>
          <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div className="issue-info">
          <h1>{title}</h1>
          <p>{description}</p>
          <img src={imgUrl} alt={imgUrl} width={300} />
          <div className="button-container">
            <button className="edit-btn" onClick={handleEditClick}>Edit Funko</button>
            <button className="delete-btn" onClick={() => deleteFunko(_id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

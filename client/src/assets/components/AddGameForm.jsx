import React, { useState } from "react";

export default function AddGameForm(props) {
  const initialInputs = {
    title: props.title || "",
    comment: props.comment || "",
    rating:props.rating || ""
  };
  const [inputs, setInputs] = useState(initialInputs);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    props.submit(inputs, props._id);
    setInputs(initialInputs);
  }

  return (
    <form onSubmit={handleSubmit} className="add-game-form">
      <input
        type="text"
        name="title"
        value={inputs.title}
        onChange={handleChange}
        placeholder="Title"
        className="input-field"
      />
      <input
        type="text"
        name="comment"
        value={inputs.comment}
        onChange={handleChange}
        placeholder="Comment"
        className="input-field"
      />
      <input
        type="text"
        name="rating"
        value={inputs.rating}
        onChange={handleChange}
        placeholder="Rated Number out of 5"
        className="input-field"
      />
      <button className="submit-button">{props.btnText}</button>
    </form>
  );
}

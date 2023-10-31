import React, { useState, useEffect } from 'react';

const initInputs = {
  title: "",
  description: "",
  imgUrl: ""
}

export default function FunkoForm({ addFunko, editFunko, FunkoToEdit }) {
  const [inputs, setInputs] = useState(initInputs);

  useEffect(() => {
    // Check if we have an Funko to edit and populate the form if needed
    if (FunkoToEdit) {
      setInputs({
        title: FunkoToEdit.title,
        description: FunkoToEdit.description,
        imgUrl: FunkoToEdit.imgUrl
      });
    }
  }, [FunkoToEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (FunkoToEdit) {
      // If FunkoToEdit exists, we're editing an  funko
      editFunko(FunkoToEdit._id, inputs); 
    } else {
      // Otherwise, we're adding a new Funko
      addFunko(inputs);
    }
    setInputs(initInputs);
  }

  const { title, description, imgUrl } = inputs;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        placeholder="Image Url"
      />
      <button className='addbutton'>{FunkoToEdit ? 'Update Funko' : 'Add Funko'}</button>
    </form>
  );
}

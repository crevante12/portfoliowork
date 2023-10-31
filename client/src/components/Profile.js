import React, { useContext, useEffect } from 'react'
import FunkoForm from './FunkoForm.js'
import FunkoList from './FunkoList.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile() {
  const {
    user: { username },
    addFunko,
    Funko,
    getUserFunkos, // Function to fetch user's Funko
  } = useContext(UserContext);

  useEffect(() => {
    // Fetch the user's Funko when the Profile component mounts
    getUserFunkos();
  },[]);

  return (
    <div className="profile">
      <h1>Welcome {username}!</h1>
      <h3>Add An Funko</h3>
      <FunkoForm addFunko={addFunko} />
      <h3>Your Funko's</h3>
      <FunkoList Funko={Funko} /> {/* Pass the user's Funkos to the FunkoList component */}
    </div>
  );
}

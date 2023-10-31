import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Funko from './Funko';
import { UserContext } from '../context/UserProvider';
 
export default function Public() {
 
  const {getAll, funkos} = useContext(UserContext)

   useEffect(()=>{
    getAll()
      },[])

  return (
    <div className="public">
      <h2>Public Page</h2>
      <p>Welcome to the public page!</p>
      <h3>Funko Pops:</h3>
      <div className="issue-grid">
        {funkos.map((funko) => (
          <Funko key={funko._id} {...funko} />
        ))}
      </div>
    </div>
  );
}

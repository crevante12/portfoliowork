
import { useEffect, useState } from 'react'
 
import axios from 'axios'
import GameData from './GameData.jsx'
import AddGameForm from './AddGameForm.jsx'
 
function Gameblog() {
const [game,setGame]= useState([])

function getGame(){
  axios.get("/api/game")
    .then(res => setGame(res.data))
    .catch(err => console.log(err))
}
function addGame(newGame){
  axios.post("/api/game",newGame)
  .then(res=> {
    setGame(prevGame => [...prevGame,res.data])
  })
  .catch(err=>console.log(err))
}
function deleteGame(gameId){
  axios.delete(`/api/game/${gameId}`)
    .then(res =>{
      setGame(prevGame=> prevGame.filter(Game=> Game._id !== gameId))
    })
    .catch(err=>console.log(err))
}
function editGame(updates,gameId){
  axios.put(`/api/game/${gameId}`,updates)
  .then(res=> {
    setGame(prevGame=> prevGame.map(Game=>Game._id !== gameId ? Game: res.data))
  })
  .catch(err => console.log(err))
}

function handleFilter(e){
  if(e.target.value === "reset"){
    getGame()
  }else{
    axios.get(`/api/game/search/type?type=${e.target.value}`)
    .then(res=>setGame(res.data))
    .catch(err=>console.log(err))

  }
}


useEffect(()=> {
  getGame()
},[])

  return (
  <div >
      <div className='movie-container'>
        <AddGameForm 
          submit= {addGame}
          btnText= "Add Game"
          editGame={editGame}
          
          
        />
         




         {game.map (Game=> 
         <GameData
         {...Game}
          key={Game.title}
          deleteGame={deleteGame}
          editGame={editGame}
          />
          )}

      </div>
  </div>
    
  )
}

export default Gameblog

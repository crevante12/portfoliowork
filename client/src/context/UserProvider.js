import React, { useState } from 'react'
import axios from 'axios'


export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    Funko:[],
    Comment:[],
    errMsg:""
    
  }

  const [userState, setUserState] = useState(initState)
  const [funkos, setFunkos] = useState([]);

  function getAll(){
    userAxios.get(`/api/funko`)
    .then( res =>setFunkos(res.data))
    .catch(err => console.log(err))
  }


  function signup(credentials){
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }
  const likedItem = (_id) => {
    userAxios
    .put(`/api/funko/like/${_id}`)
    .then((res)=>{
      setUserState(prevState => {
        return {
          ...prevState,
          Funko:prevState.Funko.map(funko => funko._id !== _id ? funko : res.data)
      }
    })
    setFunkos(prevFunko => prevFunko.map(funko => funko._id !== _id ? funko : res.data))
  })
    .catch((err)=> (console.log(err)))
  }
    
  const disLikedItem = (_id) => {
    userAxios
    .put(`/api/funko/dislike/${_id}`)
    .then((res)=>{
      setUserState(prevState => {
        return {
          ...prevState,
          Funko:prevState.Funko.map(funko => funko._id !== _id ? funko : res.data)
      }
    })
    setFunkos(prevFunko => prevFunko.map(funko => funko._id !== _id ? funko : res.data))
  })
    .catch((err)=> (console.log(err)))
  }
  console.log(userState.Funko)
  

  function login(credentials){
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserFunkos()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      Funko: []
    })
  }
function handleAuthErr(errMsg){
  setUserState(prevState => ({
    ...prevState,
      errMsg
  }))
}
function resetAuthErr(){
  setUserState(prevState => ({
    ...prevState,
      errMsg:""
  })) 
}
function getUserFunkos() {
  userAxios.get("/api/funko/user")
    .then((res) => {
      setUserState((prevState) => ({
        ...prevState,
        Funko: res.data,
      }));
    })
    .catch((err) => console.log(err.response.data.errMsg));
}

  
  function addFunko(newFunko){
    userAxios.post("/api/funko", newFunko)
      .then(res => {
         
        setUserState(prevState => ({
          ...prevState,
          Funko: [...prevState.Funko, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }
  function deleteFunko(funkoId)
  {
    console.log(funkoId)
    userAxios.delete(`/api/funko/user/${funkoId}`)
      .then(res =>{
        const filteredFunko = userState.Funko.filter(Funko=> Funko._id !== funkoId)
        setUserState(prevFunko=> ({...prevFunko,Funko:filteredFunko}))
      })
      .catch(err=>console.log(err))
  }
  function editFunko(funkoId, updatedFunko) {
    userAxios
      .put(`/api/funko/user/${funkoId}`, updatedFunko)
      .then((res) => {
        // Assuming the server returns the updated funko data
        const updatedFunkoData = res.data;
  
        // Update the funko array in userState with the updated funko
        setUserState((prevState) => ({
          ...prevState,
          Funko: prevState.Funko.map((funko) =>
            funko._id === funkoId ? updatedFunkoData : funko
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }
 

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addFunko,
        deleteFunko,
        editFunko,
        resetAuthErr,
   
        getUserFunkos,
        likedItem,
        disLikedItem,
        funkos,
        getAll
      }}>
      { props.children }
    </UserContext.Provider>
  )
}
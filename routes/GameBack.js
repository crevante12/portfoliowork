const express = require("express")
const gameRouter = express.Router()
const Game = require('../models/Game.js')


gameRouter.get("/",(req,res,next)=>{
  Game.find()
    .then((response)=>{
        res.send(response)
    })
    .catch((err)=>{
        return  next(err)
    })
})
gameRouter.get("/search/type",(req,res,next)=>{
  Game.find({type:req.query.type})
    .then((response)=>{
       res.send(response)
    })
    .catch((err)=>{
        return next(err)
    })
})
 
gameRouter.post("/", (req,res,next)=> {
    const newGame = new Game(req.body)
    newGame.save()
    .then((response)=>{
        res.send(response)
    })
    .catch((err)=>{
        return next(err)
    })
        
    
    })
gameRouter.delete("/:gameId",(req,res,next)=>{
Game.findOneAndDelete({_id: req.params.gameId})
    .then((response)=>{
        res.send(`you have deleted ${response.title}`)
    })
    .catch((err)=>{
        return next(err)
    })
})
gameRouter.put("/:gameId",(req,res,next)=>{
 Game.findOneAndUpdate( {_id: req.params.gameId}, req.body, {new:true})
    .then((response)=>{
        res.send(response)
    })
    .catch((err)=>{
        return next(err)
    })
})
 

    

module.exports= gameRouter
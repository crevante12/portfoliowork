const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema ({
    title:{
        type:String,
        required: true
    },
    comment:{
        type: String,
        required:true
    },
    rating:{
        type:String,
        required: true

    }
   }
) 
module.exports = mongoose.model("Game",gameSchema)
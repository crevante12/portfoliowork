const express= require("express") // step 1 
const app = express() //step 2 git co
const path = require("path")
const mongoose = require('mongoose')
require('dotenv').config()
//build route
// arg 1 is the Endpoint
// arg 2 is the callback function
// create middle ware that will fire every time automatically

app.use(express.json()) // looks for request body  and turns it in to 'req.body'
app.use(express.static(path.join(__dirname, "client", "build")))
// // rountes
app.use("/api/game",require( "./routes/GameBack.js"))

// error handler
app.use((err,req,res,next)=>{
    console.log(err)
    return res.send({errMsg:err.Message})
})
 
 // mongoose server
 try {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  } catch (error) {
    throw error 
  }
// tell server to be listening (requires 2 parameters)
//1.port#
//2.callback function
// use app.listen()

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(6000,()=>{
    console.log("server is running on 5000")
})


// const express = require('express')
// const mongoose = require('mongoose')

// const app = express()
// const PORT = process.env.PORT || 3000

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }

// //Routes go here
// app.all('*', (req,res) => {
//     res.json({"every thing":"is awesome"})
// })

// //Connect to the database before listening
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("listening for requests");
//     })
// })
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config()
const cors = require("cors")
const AuthRouter = require("./routes/Auth.routes")

const app = express();

// middleware

app.use(express.json())

app.use(cors())

// connect to db

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB")
}).catch(err => console.log("Error connecting to db", err))

// api endpoint

// app.get("/", (req, res) => {
//     return res.status(200).json({message : "Hello! from Backend."})
// })

app.use("/auth", AuthRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

// BpXl7viBMKiZhGDQ
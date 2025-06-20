const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
dotenv.config()
const cors = require("cors")
const AuthRouter = require("./routes/Auth.routes");
const UserRouter = require("./routes/User.route");

const app = express();

// middleware

app.use(express.json())

// parsing cookie

app.use(cookieParser())

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
}

app.use(cors(corsOptions))

// connect to db

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB")
}).catch(err => console.log("Error connecting to db", err))

// api endpoint

// app.get("/", (req, res) => {
//     return res.status(200).json({message : "Hello! from Backend."})
// })

app.use("/auth", AuthRouter)

app.use("/user", UserRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

// BpXl7viBMKiZhGDQ
const User = require("../models/User.model");
const bcrypt = require("bcryptjs")

// signup functionality

const signup = async(req, res) => {
    try{
       const {username,email, password} = req.body;

       // check whether user already exists

       const existingUserWithUsername = await User.findOne({username})

       if(existingUserWithUsername){
        return res.status(400).json({message : "Username is already taken"})
       }

       const existingUserWithEmail = await User.findOne({email})

       if(existingUserWithEmail){
        return res.status(400).json({message : "A user is already registered with this email"})
       }

       // hash password

       const hashedPassword = await bcrypt.hash(password, 10)

       // create a new user

       const newUser = new User({
        username,
        email,
        password : hashedPassword
       })

       // save the user

       await newUser.save()

       return res.status(201).json({message : "User created successfully!", newUser})

    }catch(err){
        console.log("Error signing up", err.message);
        return res.status(500).json({message : "Internal server error!", error : err.message});
    }
}

module.exports = {signup}
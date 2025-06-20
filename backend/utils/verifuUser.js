const User = require("../models/User.model");

const jwt = require("jsonwebtoken");

module.exports.verifyUser = async(req, res, next) => {
    try{
      const token = req.cookies.access_token;

      if(!token){
        throw new Error("token not found!!")
      }

      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            throw new Error("User not authorized!")
        }

        // set user
        req.user = user;

        next();
      })

    }catch(err){
        console.log("user unauthorized", err)
        return res.status(401).json({message : "Unauthorized"})
    }
}
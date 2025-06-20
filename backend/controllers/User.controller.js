const User = require("../models/User.model");

const changeUsername = async(req, res) => {
   try{

    // user id
    //   const userId = req.user.id;

      const {username, userId} = req.body;

      // find user by id

      const user = await User.findById(userId)

      console.log("user", user)

      user.username = username;

      await user.save()

      return res.status(200).json({message : "User updated succesfully",})


   }catch(err){
    console.error(err);
    return res.status(500).json({message : "Internal server Error", err})
   }
}

module.exports = {changeUsername}
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// signup functionality

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check whether user already exists

        const existingUserWithUsername = await User.findOne({ username })

        if (existingUserWithUsername) {
            return res.status(400).json({ message: "Username is already taken" })
        }

        const existingUserWithEmail = await User.findOne({ email })

        if (existingUserWithEmail) {
            return res.status(400).json({ message: "A user is already registered with this email" })
        }

        // hash password

        const hashedPassword = await bcrypt.hash(password, 10)

        // create a new user

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // save the user

        await newUser.save()

        return res.status(201).json({ message: "User created successfully!", newUser })

    } catch (err) {
        console.log("Error signing up", err.message);
        return res.status(500).json({ message: "Internal server error!", error: err.message });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check whether user exists by email
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with this email, Kindly create an account first!" })
        }
        // check whether the password is same or not
        const validPassword = await bcrypt.compareSync(password, existingUser.password)

        if (!validPassword) {
            return res.status(400).json({ message: "Passwords don't match" })
        }
        // create tokenData
        const tokenData = {
            id: existingUser._id,
            email: existingUser.email
        }
        // create token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY);
        res.cookie("access_token", token, {
            httpOnly: true,
        })
        const { password: pass, ...rest } = existingUser._doc;

        return res.status(200).json({ message: "User logged in succesfully", user: rest, token })
    } catch (err) {
        console.log("Error signing in", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = { signup, signin }
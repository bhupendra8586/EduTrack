const USER = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerAdmin(req, res) {
    try {
        const { name, email, password } = req.body;


        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const admin = await USER.create({
            name,
            email,
            password,
            role: "admin"
        });

        res.status(201).json({
            message: "Admin registered successfully",
            admin
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function loginUser(req, res) {
    const { email, password, role } = req.body;

    try {

        const user = await USER.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== role) {
            return res.status(401).json({
                message: "Invalid role selected"
            });
        }



        //password matching
        const match = await bcrypt.compare(password, user.password);
        console.log("password matched: ", match);
        if (!match) {
            return res.status(400).send({ msg: "Invalid password" });
        }

        //create token
        const token = await user.genAuthToken();
        console.log("TOKEN(authController): ", token);

        //storing token into cookies
        res.cookie("token", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );

        return res.json({ msg: "Login Successful", token, user });
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ msg: "Internal server error(authController)" });
    }
}


module.exports = {
    loginUser,
    registerAdmin,
    // logoutUser
}
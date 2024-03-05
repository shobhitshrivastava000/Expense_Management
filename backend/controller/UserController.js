const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//register controller

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        success:true,
        message:"All fields are required"
      });
    }
    const userAvailaible = await User.findOne({ email });
    if (userAvailaible) {
        return res.status(400).send({
            success:false,
            message:"Already registered, please login"
          });
    }
    //hash password
    const hashpassword = await bcrypt.hash(password, 10);
   

    const user = await User.create({
      username,
      email,
      password: hashpassword,
    })

    user.save();

    res.status(201).json({ _id: user.id, email: user.email });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Errror While Register" });
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json({message:"user does not exist"})
    }


    //compare the password with hashed one
    if (user && bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESSTOKEN_SECRET,
        { expiresIn: "7d" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error In Login" });
  }
};

module.exports = { registerUser, loginUser };

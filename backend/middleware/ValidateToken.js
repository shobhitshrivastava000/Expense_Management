const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const ValidateToken = async (req, res, next) => {

  const token = req.headers.Authorization || req.headers.authorization;
  console.log("token :",token);
  if (!token) {
    res
      .status(401)
      .send({
        success: false,
        message: "user not authorized or token is missing",
      });
  }
 
  const decoded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);

  console.log(decoded);

  //   const user = await User.findOne({ email });

  //   if (!user) {
  //       res.status(401).json({message:"user does not exist"})
  //   }

  next();
};

module.exports = ValidateToken;

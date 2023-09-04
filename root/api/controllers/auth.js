const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
// Register
const Register = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    throw new BadRequestError("Please Provide complete Data");
  }
  const hashedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC);
  try {
    const savedUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(StatusCodes.CREATED).json({ savedUser });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

// Login
const Login = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    throw new BadRequestError("Please Provide Valid Username ");
  }
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json("Wrong credentials!");
  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SEC
  ).toString(CryptoJS.enc.Utf8);
  if (hashedPassword !== req.body.password) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  const { password, ...others } = user._doc;
  res.status(StatusCodes.OK).json({ ...others, token });
};

module.exports = { Register, Login };

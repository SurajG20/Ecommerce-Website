const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports.register = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin || false;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        username,
        email,
        password: hashedPassword,
        isAdmin,
      });
      return user.save();
    })
    .then((user) => {
      res.status(201).json({
        message: "User is registered successfully.",
        user,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("wrong credentials");

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !isPasswordMatched && res.status(400).json("wrong credentials");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...rest } = user._doc;

    res.status(200).json({
      ...rest,
      message: "User is logined successfully.",
      token,
      userId: user._id.toString(),
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

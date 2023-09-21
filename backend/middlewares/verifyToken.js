const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  !authHeader && res.status(400).json({ message: "Not authenticated!" });

  const token = authHeader.split(" ")[1];

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    res.status(500).json(error);
  }
  req.user = payload;
  next();
};

module.exports.verifyTokenAndAuthorization = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports.verifyTokenAndAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not admin!");
    }
  });
};

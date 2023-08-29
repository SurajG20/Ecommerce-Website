const router = require("express").Router();
const {
  VerifyTokenAndAuth,
  VerifyToken,
  VerifyTokenAndAdmin,
} = require("../middleware/authentication");
const {
  createCart,
  updateCart,
  deleteCart,
  getAllCart,
  getCart,
} = require("../controllers/cart");

router.post("/", VerifyToken, createCart);
router.patch("/:id", VerifyTokenAndAuth, updateCart);
router.delete("/:id", VerifyTokenAndAuth, deleteCart);
router.get("/find/:userId", VerifyTokenAndAuth, getCart);
router.get("/", VerifyTokenAndAdmin, getAllCart);
module.exports = router;

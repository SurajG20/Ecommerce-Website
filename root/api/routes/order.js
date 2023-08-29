const router = require("express").Router();
const {
  VerifyTokenAndAuth,
  VerifyToken,
  VerifyTokenAndAdmin,
} = require("../middleware/authentication");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  getIncome,
} = require("../controllers/order");

router.post("/", VerifyToken, createOrder);
router.patch("/:id", VerifyTokenAndAdmin, updateOrder);
router.delete("/:id", VerifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", VerifyTokenAndAuth, getOrder);
router.get("/", VerifyTokenAndAdmin, getAllOrder);
router.get("/income", VerifyTokenAndAdmin, getIncome);
module.exports = router;

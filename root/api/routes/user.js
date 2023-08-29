const router = require("express").Router();
const {
  VerifyTokenAndAuth,
  VerifyTokenAndAdmin,
} = require("../middleware/authentication");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getStats,
} = require("../controllers/user");

router.patch("/:id", VerifyTokenAndAuth, updateUser);
router.delete("/:id", VerifyTokenAndAuth, deleteUser);
router.get("/find/:id", VerifyTokenAndAdmin, getUser);
router.get("/", VerifyTokenAndAdmin, getAllUsers);
router.get("/stats", VerifyTokenAndAdmin, getStats);
module.exports = router;

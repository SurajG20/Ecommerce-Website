const router = require("express").Router();
const {
  VerifyTokenAndAuth,
  VerifyTokenAndAdmin,
} = require("../middleware/authentication");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  getProductStats,
} = require("../controllers/product");

router.post("/", VerifyTokenAndAdmin, createProduct);
router.patch("/:id", VerifyTokenAndAdmin, updateProduct);
router.delete("/:id", VerifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProducts);
module.exports = router;

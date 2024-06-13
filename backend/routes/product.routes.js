const express = require('express');
const router = express.Router();

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts
} = require('../controllers/product.controllers');

const { authenticateUser, authorizeRoles } = require('../middlewares/authentication');

router.route('/').get(getProducts).post(authenticateUser, authorizeRoles('admin'), addProduct);

router
  .route('/:id')
  .patch(authenticateUser, authorizeRoles('admin'), updateProduct)
  .delete(authenticateUser, authorizeRoles('admin'), deleteProduct)
  .get(getProduct);

module.exports = router;

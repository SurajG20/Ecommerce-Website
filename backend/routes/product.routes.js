import express from 'express';
import { ProductController } from '../controllers/product.controllers.js';
import { authenticateUser, authorizePermissions } from '../middlewares/authentication.js';

const router = express.Router();

router
  .route('/')
  .post(authenticateUser, authorizePermissions('admin'), ProductController.createProduct)
  .get(ProductController.getAllProducts);

router
  .route('/:id')
  .get(ProductController.getProductById)
  .put(authenticateUser, authorizePermissions('admin'), ProductController.updateProduct)
  .delete(authenticateUser, authorizePermissions('admin'), ProductController.deleteProduct);

export default router;

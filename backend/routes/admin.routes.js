import express from 'express';
import { AdminController } from '../controllers/admin.controllers.js';
import { ProductController } from '../controllers/product.controllers.js';
import { authenticateUser, authorizePermissions } from '../middlewares/authentication.js';

const router = express.Router();

// Protect all admin routes
router.use(authenticateUser, authorizePermissions('admin'));

// User Management Routes
router.get('/users', AdminController.getAllUsers);
router.get('/users/:userId', AdminController.getUserDetails);
router.put('/users/:userId/status', AdminController.updateUserStatus);

// Product Management Routes
router.get('/products', ProductController.getAllProducts);
router.post('/products', ProductController.createProduct);
router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

export default router;

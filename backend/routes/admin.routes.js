import express from 'express';
import { AdminController } from '../controllers/admin.controllers.js';
import { ProductController } from '../controllers/product.controllers.js';
import { authenticateUser, authorizePermissions } from '../middlewares/authentication.js';
import { validateGetOrders } from '../validations/order.validation.js';

const router = express.Router();

router.use(authenticateUser, authorizePermissions('admin'));

router.get('/users', AdminController.getAllUsers);
router.get('/users/:userId', AdminController.getUserDetails);
router.patch('/users/:userId/status', AdminController.updateUserStatus);

router.get('/products', ProductController.getAllProducts);
router.post('/products', ProductController.createProduct);
router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

router.get('/orders', AdminController.getAllOrders);
router.get('/orders/:orderId', AdminController.getOrderDetails);
router.patch('/orders/:orderId/status', AdminController.updateOrderStatus);
router.patch('/orders/:orderId/tracking', AdminController.addTrackingNumber);

router.get('/maintenance', AdminController.getMaintenanceMode);
router.patch('/maintenance', AdminController.toggleMaintenanceMode);

export default router;

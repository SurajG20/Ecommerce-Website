import express from 'express';
import { OrderController } from '../controllers/order.controllers.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', authenticateUser, OrderController.getUserOrders);
router.get('/:orderId', authenticateUser, OrderController.getOrderById);

export default router;

import express from 'express';
import { maintenanceMode } from '../middlewares/authentication.js';
import adminRoutes from './admin.routes.js';
import authRoutes from './auth.routes.js';
import orderRoutes from './order.routes.js';
import productRoutes from './product.routes.js';
import stripeRoutes from './stripe.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', maintenanceMode, productRoutes);
router.use('/stripe/webhook', stripeRoutes);
router.use('/stripe', maintenanceMode, stripeRoutes);
router.use('/admin', adminRoutes);
router.use('/orders', maintenanceMode, orderRoutes);

export default router;

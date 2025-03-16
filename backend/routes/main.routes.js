import express from 'express';
import { maintenanceMode } from '../middlewares/authentication.js';
import adminRoutes from './admin.routes.js';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import stripeRoutes from './stripe.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', maintenanceMode, productRoutes);
router.use('/checkout', maintenanceMode, stripeRoutes);
router.use('/admin', adminRoutes);

export default router;

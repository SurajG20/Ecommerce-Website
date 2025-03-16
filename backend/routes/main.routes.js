import express from 'express';
import adminRoutes from './admin.routes.js';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import stripeRoutes from './stripe.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/checkout', stripeRoutes);
router.use('/admin', adminRoutes);

export default router;

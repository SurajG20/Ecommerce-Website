import express from 'express';
import { StripeController } from '../controllers/stripe.controllers.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.post('/create-session', authenticateUser, StripeController.createCheckoutSession);

router.post('/webhook', express.raw({ type: 'application/json' }), StripeController.handleWebhook);

export default router;

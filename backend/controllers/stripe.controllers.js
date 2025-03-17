import { StripeService } from '../services/stripe.service.js';
import ResponseHandler from '../utils/responseHandler.js';

export class StripeController {
  static async createCheckoutSession(req, res) {
    const { line_items, customer_email, metadata, success_url, cancel_url } = req.body;

    if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
      return ResponseHandler.error(res)('Invalid line items data');
    }

    if (!customer_email) {
      return ResponseHandler.error(res)('Customer email is required');
    }

    try {
      const session = await StripeService.createCheckoutSession({
        lineItems: line_items,
        customerEmail: customer_email,
        userId: req.user.id,
        metadata,
        successUrl: success_url || `${config.CLIENT_URL}/success`,
        cancelUrl: cancel_url || `${config.CLIENT_URL}/cancel`,
      });

      return ResponseHandler.success(res)('Checkout session created', { sessionId: session.id });
    } catch (error) {
      console.error('Stripe session creation error:', error);
      return ResponseHandler.error(res)(error.message || 'Failed to create checkout session');
    }
  }

  static async handleWebhook(req, res) {
    try {
      const event = await StripeService.constructWebhookEvent(req.rawBody, req.headers['stripe-signature']);

      await StripeService.handleWebhookEvent(event);

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
}

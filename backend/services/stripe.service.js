import Stripe from 'stripe';
import config from '../config/config.js';

const stripe = Stripe(config.STRIPE_SECRET_KEY);
const endpointSecret = config.STRIPE_WEBHOOK_SECRET;

export class StripeService {
  static async createCheckoutSession({ lineItems, customerEmail, userId, metadata = {}, successUrl, cancelUrl }) {
    if (!this.validateLineItems(lineItems)) {
      throw new Error('Invalid line items structure');
    }

    try {
      return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        customer_email: customerEmail,
        metadata: {
          userId,
          ...metadata,
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
    } catch (error) {
      console.error('Stripe session creation error:', error);
      throw new Error(error.message || 'Failed to create checkout session');
    }
  }

  static validateLineItems(lineItems) {
    return lineItems.every((item) => {
      const { price_data, quantity } = item;
      if (!price_data || !quantity) return false;

      const { currency, product_data, unit_amount } = price_data;
      if (!currency || !product_data || !unit_amount) return false;

      const { name, images } = product_data;
      return !!(name && Array.isArray(images) && images.length > 0);
    });
  }

  static async constructWebhookEvent(rawBody, signature) {
    if (!signature) {
      throw new Error('No signature provided for webhook');
    }

    return stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  }

  static async handleWebhookEvent(event) {
    switch (event.type) {
      case 'checkout.session.completed': {
        await this.handleSuccessfulPayment(event.data.object);
        break;
      }

      case 'payment_intent.payment_failed': {
        await this.handleFailedPayment(event.data.object);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  static async handleSuccessfulPayment(session) {
    try {
      const orderDetails = {
        userId: session.metadata.userId,
        customerEmail: session.customer_email,
        amount: session.amount_total,
        currency: session.currency,
        paymentStatus: session.payment_status,
        paymentIntent: session.payment_intent,
      };

      // Here you would:
      // 1. Create order in your database
      // await OrderService.create(orderDetails);

      // 2. Send confirmation email
      // await EmailService.sendOrderConfirmation({
      //   email: orderDetails.customerEmail,
      //   orderId: order.id,
      //   amount: orderDetails.amount,
      // });

      console.log('Payment processed successfully:', session.id);
    } catch (error) {
      console.error('Error processing successful payment:', error);
      throw error;
    }
  }

  static async handleFailedPayment(paymentIntent) {
    try {
      const errorMessage = paymentIntent.last_payment_error?.message;
      console.error('Payment failed:', errorMessage);

      const failureDetails = {
        userId: paymentIntent.metadata.userId,
        error: errorMessage,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      };

      // Here you would:
      // 1. Log the failure
      // await PaymentLogService.logFailure(failureDetails);

      // 2. Notify admin
      // await NotificationService.notifyAdmin('payment_failed', failureDetails);
    } catch (error) {
      console.error('Error handling failed payment:', error);
      throw error;
    }
  }
}

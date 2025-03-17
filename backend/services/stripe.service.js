import Stripe from 'stripe';
import config from '../config/config.js';
import { OrderService } from './order.service.js';
import { PaymentLogService } from './paymentLog.service.js';

const stripe = Stripe(config.STRIPE_SECRET_KEY);
const endpointSecret = config.STRIPE_WEBHOOK_SECRET;

export class StripeService {
  static async createCheckoutSession({ lineItems, customerEmail, userId, metadata = {}, successUrl, cancelUrl }) {
    if (!this.validateLineItems(lineItems)) {
      throw new Error('Invalid line items structure');
    }

    try {
      let customer;
      const existingCustomers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: customerEmail,
          metadata: {
            userId,
            ...metadata,
          },
        });
      }

      return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['IN'],
        },
        line_items: lineItems,
        mode: 'payment',
        customer: customer.id,
        metadata: {
          userId,
          customerId: customer.id,
          ...metadata,
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
    } catch (error) {
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
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      const orderDetails = {
        userId: session.metadata.userId,
        customerId: session.metadata.customerId,
        customerEmail: session.customer_details.email,
        customerName: session.customer_details.name,
        items: lineItems.data.map((item) => ({
          productId: item.price.product.metadata.id,
          title: item.price.product.name,
          price: item.price.unit_amount / 100,
          quantity: item.quantity,
          size: item.price.product.metadata.size,
          color: item.price.product.metadata.color,
          image: item.price.product.images[0],
        })),
        totalAmount: session.amount_total / 100,
        currency: session.currency,
        paymentStatus: session.payment_status,
        paymentIntentId: session.payment_intent,
        shippingAddress: session.customer_details.address,
      };

      const order = await OrderService.create(orderDetails);
      return order;
    } catch (error) {
      console.error('Error handling successful payment:', error);
      throw error;
    }
  }

  static async handleFailedPayment(paymentIntent) {
    try {
      const errorMessage = paymentIntent.last_payment_error?.message;
      const errorCode = paymentIntent.last_payment_error?.code;
      const errorType = paymentIntent.last_payment_error?.type;

      const failureDetails = {
        userId: paymentIntent.metadata.userId,
        customerId: paymentIntent.metadata.customerId,
        customerEmail: paymentIntent.metadata.customerEmail,
        customerName: paymentIntent.metadata.customerName,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        errorCode,
        errorMessage,
        errorType,
        metadata: {
          paymentMethod: paymentIntent.last_payment_error?.payment_method?.type,
          declineCode: paymentIntent.last_payment_error?.decline_code,
          ...paymentIntent.metadata,
        },
      };

      const paymentLog = await PaymentLogService.create(failureDetails);
      return paymentLog;
    } catch (error) {
      console.error('Error handling failed payment:', error);
      throw error;
    }
  }
}

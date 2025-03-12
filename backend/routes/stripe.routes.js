import express from "express";
import Stripe from "stripe";
import ResponseHandler from '../utils/responseHandler.js';

const stripe = Stripe(process.env.STRIPE_SECRET);
const router = express.Router();

router.post("/", async (req, res) => {
  const { products } = req.body;
  
  if (!products || !Array.isArray(products) || products.length === 0) {
    return ResponseHandler.error(res)('Invalid products data');
  }

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return ResponseHandler.success(res)('Checkout session created', { id: session.id });
  } catch (error) {
    return ResponseHandler.error(res)('Failed to create checkout session');
  }
});

export default router;

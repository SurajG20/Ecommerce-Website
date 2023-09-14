const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);
const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { cart } = req.body;
//     console.log(req.body);
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price: "prod_Od6F9FuYxMrfTp",
//           quantity: cart.totalQuantity,
//         },
//       ],
//       mode: "payment",
//       success_url: process.env.CLIENT_URL + "/success",
//       cancel_url: process.env.CLIENT_URL + "/cancel",
//     });

//     return { stripeSession: session };
//   } catch (error) {
//     console.log(error);
//   }
// });
router.post("/", async (req, res) => {
  const { products } = req.body;
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

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

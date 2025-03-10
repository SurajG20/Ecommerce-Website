import express from "express";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/checkout", stripeRoutes);

export default router;

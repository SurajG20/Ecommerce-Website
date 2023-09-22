const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./db/connect");
dotenv.config();

const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const stripeRoutes = require("./routes/stripe");

const cors = require("cors");
const app = express();

// Parse the body text
app.use(bodyParser.json());

// CORS
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/checkout", stripeRoutes);

// Error
app.use((req, res) => {
  res.status(404).json({
    message: "Error serving the request !",
  });
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

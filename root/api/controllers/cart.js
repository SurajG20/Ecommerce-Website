const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const Cart = require("../models/Cart");

const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  if (!newCart) {
    throw new BadRequestError("Please Provide complete Data");
  }
  try {
    const savedCart = await newCart.save();
    res.status(StatusCodes.CREATED).json({ savedCart });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(StatusCodes.ACCEPTED).json({ updatedCart });
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("Cart has been deleted");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(StatusCodes.OK).json(carts);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart,
};

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  if (!newProduct) {
    throw new BadRequestError("Please Provide complete Data");
  }
  try {
    const savedProduct = await newProduct.save();
    res.status(StatusCodes.CREATED).json({ savedProduct });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(StatusCodes.ACCEPTED).json({ updatedProduct });
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("Product has been deleted");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getAllProducts = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategories = req.query.categories;
  let products;
  try {
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategories) {
      products = await Product.find({
        categories: { $in: [queryCategories] },
      });
    } else {
      products = await Product.find();
    }
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};

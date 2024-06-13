const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const addProduct = async (req, res) => {
  const { title, description, image, category, size, color, price, discount, inStock } = req.body;
  if (
    !title ||
    !description ||
    !image ||
    !category ||
    !size ||
    !color ||
    !price ||
    !discount ||
    inStock === undefined
  ) {
    throw new CustomError.BadRequestError('Please provide all the required fields.');
  }
  const newProduct = new Product({
    title,
    description,
    image,
    category,
    size,
    color,
    price,
    discount,
    inStock
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(StatusCodes.CREATED).json({
      message: 'Product is added successfully.',
      product: savedProduct
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, category, size, color, price, discount, inStock } = req.body;
  if (
    !title ||
    !description ||
    !image ||
    !category ||
    !size ||
    !color ||
    !price ||
    !discount ||
    inStock === undefined
  ) {
    throw new CustomError.BadRequestError('Please provide all the required fields.');
  }
  const productExist = await Product.findById(id);
  if (!productExist) {
    throw new CustomError.NotFoundError(`No product found with id: ${id}`);
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          image,
          category,
          size,
          color,
          price,
          discount,
          inStock
        }
      },
      {
        new: true
      }
    );
    res.status(StatusCodes.OK).json({
      message: 'Product is updated successfully.',
      updatedProduct
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({
      message: 'Product is deleted successfully.'
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getProducts = async (req, res) => {
  const { page = 1, limit = 15 } = req.query;
  const newQuery = req.query.new;
  const categoryQuery = req.query.category;

  try {
    let products;
    let query = {};

    if (newQuery) {
      query = {
        ...query
      };
    } else if (categoryQuery) {
      query = { ...query, category: categoryQuery };
    }

    const skip = (page - 1) * limit;

    products = await Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10));
    const totalProducts = await Product.countDocuments(query);

    res.status(StatusCodes.CREATED).json({ products, totalProducts });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts
};

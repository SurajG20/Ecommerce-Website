const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  if (!newOrder) {
    throw new BadRequestError("Please Provide complete Data");
  }
  try {
    const savedOrder = await newOrder.save();
    res.status(StatusCodes.CREATED).json({ savedOrder });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(StatusCodes.ACCEPTED).json({ updatedOrder });
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("Order has been deleted");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getOrder = async (req, res) => {
  try {
    const Order = await Order.find({ userId: req.params.userId });
    res.status(StatusCodes.OK).json(Order);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getAllOrder = async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(StatusCodes.OK).json(Orders);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(StatusCodes.OK).json(income);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  getIncome,
};

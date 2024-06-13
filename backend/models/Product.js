const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please Provide Title'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Please Provide Description']
    },
    image: {
      type: String,
      required: [true, 'Please Provide Image']
    },
    category: {
      type: Array
    },
    size: {
      type: Array
    },
    color: {
      type: Array
    },
    price: {
      type: Number,
      required: [true, 'Please Provide Price']
    },
    discount: {
      type: Number,
      required: [true, 'Please Provide Discount']
    },

    inStock: {
      type: Boolean,
      default: [true, 'Please Provide InStock']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', ProductSchema);

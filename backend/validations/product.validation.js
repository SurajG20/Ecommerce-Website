import Joi from 'joi';

export const createProductSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty'
    }),

  description: Joi.string()
    .required()
    .messages({
      'any.required': 'Description is required',
      'string.empty': 'Description cannot be empty'
    }),

  image: Joi.string()
    .required()
    .messages({
      'any.required': 'Image URL is required',
      'string.empty': 'Image URL cannot be empty'
    }),

  category: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      'array.base': 'Category must be an array'
    }),

  size: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      'array.base': 'Size must be an array'
    }),

  color: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      'array.base': 'Color must be an array'
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      'any.required': 'Price is required',
      'number.positive': 'Price must be a positive number'
    }),

  discount: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      'any.required': 'Discount is required',
      'number.min': 'Discount cannot be less than 0',
      'number.max': 'Discount cannot be more than 100'
    }),

  inStock: Joi.boolean()
    .default(true)
});

export const updateProductSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  image: Joi.string(),
  category: Joi.array().items(Joi.string()),
  size: Joi.array().items(Joi.string()),
  color: Joi.array().items(Joi.string()),
  price: Joi.number().positive(),
  discount: Joi.number().min(0).max(100),
  inStock: Joi.boolean()
}).min(1); 
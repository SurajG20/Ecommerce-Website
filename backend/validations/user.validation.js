import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    })
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50),

  email: Joi.string()
    .email(),

  password: Joi.string()
    .min(6),

  role: Joi.string()
    .valid('admin', 'user')
}).min(1); 
import Joi from 'joi';

export const validateGetOrder = Joi.object({
  params: Joi.object({
    orderId: Joi.number().integer().required().messages({
      'number.base': 'Order ID must be a number',
      'number.integer': 'Order ID must be an integer',
      'any.required': 'Order ID is required',
    }),
  }),
});

export const validateGetOrders = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be greater than or equal to 1',
    }),
    limit: Joi.number().integer().min(1).max(100).default(10).messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be greater than or equal to 1',
      'number.max': 'Limit must be less than or equal to 100',
    }),
    status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').messages({
      'any.only': 'Invalid order status',
    }),
    startDate: Joi.date().iso().messages({
      'date.base': 'Start date must be a valid date',
      'date.format': 'Start date must be in ISO format',
    }),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).messages({
      'date.base': 'End date must be a valid date',
      'date.format': 'End date must be in ISO format',
      'date.min': 'End date must be after start date',
    }),
  }),
});

export const validateUpdateOrderStatus = Joi.object({
  body: Joi.object({
    status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required().messages({
      'any.only': 'Invalid order status',
      'any.required': 'Status is required',
    }),
  }),
});

export const validateAddTrackingNumber = Joi.object({
  body: Joi.object({
    trackingNumber: Joi.string().required().trim().messages({
      'string.empty': 'Tracking number cannot be empty',
      'any.required': 'Tracking number is required',
    }),
  }),
});

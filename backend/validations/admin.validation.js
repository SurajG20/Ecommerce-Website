import Joi from 'joi';

export const updateUserStatusSchema = Joi.object({
  isBlocked: Joi.boolean().required().messages({
    'boolean.base': 'Status must be a boolean value',
    'any.required': 'Status is required',
  }),
});

export const getUsersQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(''),
  sortBy: Joi.string().valid('name', 'email', 'createdAt').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  isBlocked: Joi.boolean(),
});

export const toggleMaintenanceModeSchema = Joi.object({
  enabled: Joi.boolean().required().messages({
    'boolean.base': 'Enabled must be a boolean value',
    'any.required': 'Enabled status is required',
  }),
});

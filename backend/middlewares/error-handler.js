import logger from "../config/logger.js";
import ResponseHandler from '../utils/responseHandler.js';

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message} - ${req.originalUrl} - ${req.method}`);

  // Handle Sequelize errors
  if (err.name === 'SequelizeValidationError') {
    return ResponseHandler.error(res)(err.errors[0].message);
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return ResponseHandler.error(res)(`${err.errors[0].path} already exists`);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return ResponseHandler.unauthorize(res)('Invalid or expired token');
  }

  // Handle known error status
  if (err.status) {
    return ResponseHandler.error(res)(err.message);
  }

  // Default server error
  return ResponseHandler.serverError(res)();
};

export default errorHandler;

import ResponseHandler from '../utils/responseHandler.js';

const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    return ResponseHandler.error(res)(err.errors[0].message);
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return ResponseHandler.error(res)(`${err.errors[0].path} already exists`);
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return ResponseHandler.unauthorize(res)('Invalid or expired token');
  }

  if (err.status) {
    return ResponseHandler.error(res)(err.message);
  }

  return ResponseHandler.serverError(res)();
};

export default errorHandler;

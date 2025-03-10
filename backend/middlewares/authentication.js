import { JWTService } from '../services/jwt.service.js';
import { CustomError } from '../errors/index.js';
import { UserService } from '../services/user.service.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new CustomError.UnauthenticatedError('Authentication invalid');
    }

    const token = authHeader.split(' ')[1];
    const payload = JWTService.verifyToken(token);
    
    const user = await UserService.findUserById(payload.id);
    req.user = user;
    next();
  } catch (error) {
    next(new CustomError.UnauthenticatedError('Authentication invalid'));
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};

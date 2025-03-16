import { JWTService } from '../services/jwt.service.js';
import { MaintenanceService } from '../services/maintenance.services.js';
import { UserService } from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return responseHandler.unauthorize(res)('Authentication invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = JWTService.verifyToken(token);
      const user = await UserService.findUserById(payload.id);

      if (!user) {
        return responseHandler.unauthorize(res)('User no longer exists');
      }

      req.user = user;
      next();
    } catch (error) {
      return responseHandler.unauthorize(res)('Invalid token');
    }
  } catch (error) {
    return responseHandler.error(res)('Authentication failed');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return responseHandler.forbidden(res)('Not authorized to access this route');
    }
    next();
  };
};

export const maintenanceMode = async (req, res, next) => {
  const maintenanceMode = await MaintenanceService.getMaintenanceMode();
  if (maintenanceMode) {
    return responseHandler.maintenance(res)('Maintenance mode is active');
  }
  next();
};

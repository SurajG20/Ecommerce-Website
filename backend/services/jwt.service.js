import jwt from 'jsonwebtoken';
import Config from '../config/config.js';

export class JWTService {
  static createToken(payload) {
    return jwt.sign(payload, Config.JWT_SECRET, {
      expiresIn: Config.JWT_LIFETIME,
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, Config.JWT_SECRET);
  }

  static generateAuthToken(user) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = this.createToken(payload);
    return token;
  }
}

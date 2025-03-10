import jwt from 'jsonwebtoken';

export class JWTService {
  static createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  static generateAuthToken(user) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    const token = this.createToken(payload);
    return token;
  }
} 
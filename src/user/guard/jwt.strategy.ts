import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      ignoreExpiration: false, // Ensure the token is not expired
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // Use a strong secret in production
    });
  }

  // Validate the decoded token and attach user data to the request
  async validate(payload: any) {
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}

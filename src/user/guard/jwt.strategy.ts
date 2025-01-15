import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'secretKey'),
    });
  }

  async validate(payload: any) {
    console.log('Decoded JWT Payload:', payload); // Debugging line

    if (!payload || !payload.id || !payload.email || !payload.role) {
      throw new UnauthorizedException('Invalid token');
    }

    // Attach user details to the request
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}

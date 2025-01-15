import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
    });
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  async generateJwt(user: UserDto) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Get the JWT secret from ConfigService
    const secret = this.configService.get<string>('JWT_SECRET', 'secretKey');

    return this.jwtService.sign(payload, { secret });
  }
}

import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
    });
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  async generateJwt(user: User): Promise<string> {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}

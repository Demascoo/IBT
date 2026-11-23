import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await argon2.hash(dto.password);
    const user = await this.users.create(dto.email, passwordHash);
    return { id: user.id, email: user.email };
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);

    // One check for both failures (Security!)
    const valid =
      user && (await argon2.verify(user.passwordHash, dto.password));
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user.id, user.email);
  }

  async issueTokens(userId: number, email: string) {
    const payload = { sub: userId, email };
    return {
      accessToken: this.jwt.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwt.sign(payload, { expiresIn: '7d' }),
    };
  }
}

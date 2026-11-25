import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_ACCESS_SECRET ||
        'super-secret-jwt-access-key-do-not-share',
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    // This object is attached to req.user
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles || ['customer'], // <--- Fallback prevents the 500 crash
    };
  }
}

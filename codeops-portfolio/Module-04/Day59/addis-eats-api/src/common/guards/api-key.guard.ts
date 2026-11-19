import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly API_KEY = 'super-secret-key'; // In real life, use ConfigService

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const key = req.headers['x-api-key'] as string;

    if (!key) {
      throw new UnauthorizedException('x-api-key is required');
    }
    if (key !== this.API_KEY) {
      throw new ForbiddenException('Invalid API Key');
    }
    return true;
  }
}

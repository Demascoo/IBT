import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from './auth/public.decorator';

@Public()
@Controller('health')
export class HealthController {
  @Get()
  @SkipThrottle({ default: true, strict: true })
  check() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}

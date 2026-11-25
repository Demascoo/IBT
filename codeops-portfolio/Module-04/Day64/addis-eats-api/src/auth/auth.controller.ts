import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Throttle({ strict: { limit: 3, ttl: 3600000 } }) // 3 per hour
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ strict: { limit: 5, ttl: 900000 } }) // 5 per 15 mins
  @ApiOperation({ summary: 'Login and get tokens' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}

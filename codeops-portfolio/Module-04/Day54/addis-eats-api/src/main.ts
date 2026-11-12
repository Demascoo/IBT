import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Turn on the global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips extra fields
      transform: true, // transforms types (string -> number)
    }),
  );

  app.setGlobalPrefix('api'); // every route starts with /api

  await app.listen(3000);
}
bootstrap();

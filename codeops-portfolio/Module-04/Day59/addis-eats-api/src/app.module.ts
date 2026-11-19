import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';

// Middleware & Interceptors
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [RestaurantsModule, DishesModule, OrdersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // This registers the logging interceptor globally via Dependency Injection
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // This applies the Request-Id generator to every single route
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}

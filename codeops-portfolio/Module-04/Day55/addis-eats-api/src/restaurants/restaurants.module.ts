import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import {
  RESTAURANT_REPOSITORY,
  InMemoryRestaurantRepository,
} from './restaurant.repository';

@Module({
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    {
      provide: RESTAURANT_REPOSITORY,
      useClass: InMemoryRestaurantRepository,
    },
  ],
})
export class RestaurantsModule {}

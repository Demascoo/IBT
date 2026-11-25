import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import {
  RESTAURANT_REPOSITORY,
  InMemoryRestaurantRepository,
} from './restaurant.repository';
import { STORAGE_SERVICE } from '../common/storage/storage.service';
import { LocalStorageService } from '../common/storage/local-storage.service';

@Module({
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    { provide: RESTAURANT_REPOSITORY, useClass: InMemoryRestaurantRepository },
    { provide: STORAGE_SERVICE, useClass: LocalStorageService },
  ],
})
export class RestaurantsModule {}

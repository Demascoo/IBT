import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { Restaurant } from './restaurant.types';
import type { RestaurantRepository } from './restaurant.repository';
import { RESTAURANT_REPOSITORY } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY)
    private readonly repo: RestaurantRepository,
  ) {}

  findAll(): Restaurant[] {
    return this.repo.all();
  }

  findOne(id: number): Restaurant {
    const hit = this.repo.byId(id);
    if (!hit) {
      throw new NotFoundException(`Restaurant ${id} not found`);
    }
    return hit;
  }

  create(dto: CreateRestaurantDto): Restaurant {
    const nextId = Math.max(0, ...this.repo.all().map((r) => r.id)) + 1;
    const newRestaurant: Restaurant = {
      ...dto,
      id: nextId,
      isOpen: dto.isOpen ?? true,
    };
    return this.repo.save(newRestaurant);
  }
}

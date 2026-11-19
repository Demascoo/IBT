import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { Dish } from './dish.types';
import type { DishRepository } from './dish.repository';
import { DISH_REPOSITORY } from './dish.repository';
import { CreateDishDto } from './dto/create-dish.dto';
import type { Page } from '../shared/page.types';

const EXISTING_RESTAURANTS = [1, 2, 3, 4];

@Injectable()
export class DishesService {
  constructor(
    @Inject(DISH_REPOSITORY)
    private readonly repo: DishRepository,
  ) {}

  // <--- UPDATED: Accepts limit and offset, returns Page<Dish>
  findAll(limit: number = 10, offset: number = 0): Page<Dish> {
    const rows = this.repo.all();
    const total = rows.length;
    const items = rows.slice(offset, offset + limit);

    return { items, total, limit, offset };
  }

  findOne(id: number): Dish {
    const dish = this.repo.byId(id);
    if (!dish) {
      throw new NotFoundException(`Dish ${id} not found`);
    }
    return dish;
  }

  create(dto: CreateDishDto): Dish {
    if (!EXISTING_RESTAURANTS.includes(dto.restaurantId)) {
      throw new NotFoundException(`Restaurant ${dto.restaurantId} not found`);
    }

    const nextId = Math.max(0, ...this.repo.all().map((d) => d.id)) + 1;
    const newDish: Dish = {
      ...dto,
      id: nextId,
    };

    return this.repo.save(newDish);
  }
}

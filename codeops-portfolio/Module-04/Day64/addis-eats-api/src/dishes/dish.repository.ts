import { Injectable } from '@nestjs/common';
import type { Dish } from './dish.types';
import { SEED_DISHES } from './dish.seed';

export const DISH_REPOSITORY = 'DISH_REPOSITORY';

export interface DishRepository {
  all(): Dish[]; // <--- Removed restaurantId from here
  byId(id: number): Dish | undefined;
  save(dish: Dish): Dish;
}

@Injectable()
export class InMemoryDishRepository implements DishRepository {
  private readonly rows = new Map<number, Dish>(
    SEED_DISHES.map((d) => [d.id, d]),
  );

  all(): Dish[] {
    return Array.from(this.rows.values());
  }

  byId(id: number): Dish | undefined {
    return this.rows.get(id);
  }

  save(dish: Dish): Dish {
    this.rows.set(dish.id, dish);
    return dish;
  }
}

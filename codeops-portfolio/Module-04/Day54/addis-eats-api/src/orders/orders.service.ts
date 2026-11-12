import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Order } from './order.types';
import type { OrderRepository } from './order.repository';
import { ORDER_REPOSITORY } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {}

  findAll(): Order[] {
    return this.repo.all();
  }

  findOne(id: number): Order {
    const order = this.repo.byId(id);
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  create(order: Order): Order {
    return this.repo.save(order);
  }
}

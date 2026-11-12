import { Injectable } from '@nestjs/common';
import { Order } from './order.types';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface OrderRepository {
  save(order: Order): Order;
  byId(id: number): Order | undefined;
  all(): Order[];
}

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Order[] = [];

  save(order: Order): Order {
    this.orders.push(order);
    return order;
  }

  byId(id: number): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  all(): Order[] {
    return this.orders;
  }
}

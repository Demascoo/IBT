import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { Order } from './order.types';
import type { OrderRepository } from './order.repository';
import { ORDER_REPOSITORY } from './order.repository';
import { FindOrdersQueryDto } from './dto/find-orders-query.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import type { Page } from '../shared/page.types';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {}

  findAll(query: FindOrdersQueryDto): Page<Order> {
    let rows = this.repo.all();

    // 1. Filter
    if (query.status) rows = rows.filter((o) => o.status === query.status);
    if (query.area) rows = rows.filter((o) => o.area === query.area);

    // 2. Sort (spread first to avoid mutating original data)
    rows = [...rows].sort((a, b) => {
      const valA = a[query.sort as keyof Order];
      const valB = b[query.sort as keyof Order];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return valA - valB;
      }
      return 0;
    });

    // 3. Page
    const total = rows.length;
    const items = rows.slice(query.offset, query.offset + query.limit);

    return { items, total, limit: query.limit, offset: query.offset };
  }

  findPending(): Page<Order> {
    const pending = this.repo.all().filter((o) => o.status === 'PENDING');
    return {
      items: pending,
      total: pending.length,
      limit: pending.length,
      offset: 0,
    };
  }

  findOne(id: number): Order {
    const order = this.repo.byId(id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  // 👇 THIS IS WHERE THE CREATE METHOD GOES 👇
  create(dto: CreateOrderDto): Order {
    const nextId = Math.max(0, ...this.repo.all().map((o) => o.id)) + 1;

    const newOrder: Order = {
      ...dto,
      id: nextId,
      status: 'PENDING', // Set default status
    };

    return this.repo.save(newOrder);
  }

  updateStatus(id: number, status: Order['status']): Order {
    const order = this.findOne(id); // Throws 404 if missing
    order.status = status;
    return this.repo.save(order);
  }

  cancel(id: number): void {
    this.findOne(id); // Throws 404 if missing
    this.repo.delete(id);
  }
}

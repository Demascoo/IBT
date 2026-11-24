import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ORDER_REPOSITORY, InMemoryOrderRepository } from './order.repository';
import { OrderOwnershipGuard } from './guards/order-ownership.guard';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderOwnershipGuard, // <--- MUST BE HERE for the guard to inject OrdersService
    {
      provide: ORDER_REPOSITORY,
      useClass: InMemoryOrderRepository,
    },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}

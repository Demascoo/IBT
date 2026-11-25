import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ORDER_REPOSITORY, InMemoryOrderRepository } from './order.repository';
import { OrderOwnershipGuard } from './guards/order-ownership.guard';
import { AuthModule } from '../auth/auth.module';
import { NotificationsService } from './notifications.service';
import { MAILER } from '../common/mail/mailer.interface';
import { ConsoleMailerService } from '../common/mail/console-mailer.service';

@Module({
  imports: [AuthModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderOwnershipGuard,
    NotificationsService, // <--- Add the notification service
    {
      provide: ORDER_REPOSITORY,
      useClass: InMemoryOrderRepository,
    },
    {
      provide: MAILER, // <--- Register the Mailer interface
      useClass: ConsoleMailerService, // <--- Use Console for now
    },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from '../orders.service';
import type { User } from '../../users/user.types';

@Injectable()
export class OrderOwnershipGuard implements CanActivate {
  constructor(private readonly ordersService: OrdersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;

    // Staff bypasses everything (Added ?. to prevent crash if roles is missing)
    if (user?.roles?.includes('staff')) {
      return true;
    }

    const id = Number(req.params.id);
    const order = this.ordersService.findOne(id);

    // If it's not theirs, pretend it doesn't exist (404)
    if (order.customerId !== user.id) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    // Stash the order on the request so the controller can use it
    req.order = order;
    return true;
  }
}

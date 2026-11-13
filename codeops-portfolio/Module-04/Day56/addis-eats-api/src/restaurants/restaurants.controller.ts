import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { OrdersService } from '../orders/orders.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly ordersService: OrdersService, // <--- INJECTED HERE
  ) {}

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get('open')
  findOpen() {
    return this.restaurantsService.findOpen();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.findOne(id);
  }

  // THIS IS THE MISSING SUB-RESOURCE ROUTE
  @Get(':id/orders')
  findOrdersForRestaurant(@Param('id', ParseIntPipe) id: number) {
    this.restaurantsService.findOne(id); // Validate parent
    return this.ordersService.findAll({
      limit: 50,
      offset: 0,
      sort: 'id',
    } as any);
  }

  @Post()
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurantsService.create(dto);
  }
}

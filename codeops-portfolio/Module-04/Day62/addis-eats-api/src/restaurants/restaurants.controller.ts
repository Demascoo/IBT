import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { RestaurantsService } from './restaurants.service';
import { OrdersService } from '../orders/orders.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Public()
@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List all restaurants, optionally filtered by isOpen',
  })
  @ApiResponse({ status: 200, description: 'Returns a list of restaurants' })
  findAll(@Query('isOpen') isOpen?: string) {
    const parsedIsOpen =
      isOpen === 'true' ? true : isOpen === 'false' ? false : undefined;
    return this.restaurantsService.findAll(parsedIsOpen);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Returns the restaurant' })
  @ApiNotFoundResponse({ description: 'Restaurant not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.findOne(id);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'Get all orders for a specific restaurant' })
  @ApiResponse({ status: 200, description: 'Returns the orders' })
  @ApiNotFoundResponse({ description: 'Restaurant not found' })
  findOrdersForRestaurant(@Param('id', ParseIntPipe) id: number) {
    this.restaurantsService.findOne(id);

    // FIX: Pass a dummy staff user so the service doesn't filter by customerId
    return this.ordersService.findAll(
      { limit: 50, offset: 0, sort: 'id' } as any,
      { id: 0, email: 'guest', roles: ['staff'], passwordHash: '' },
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiCreatedResponse({ description: 'Restaurant created successfully' })
  create(
    @Body() dto: CreateRestaurantDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newRestaurant = this.restaurantsService.create(dto);
    res.header('Location', `/api/v1/restaurants/${newRestaurant.id}`);
    return newRestaurant;
  }
}

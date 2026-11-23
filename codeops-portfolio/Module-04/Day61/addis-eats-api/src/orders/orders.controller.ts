import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiBearerAuth, // <-- Changed from ApiSecurity
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FindOrdersQueryDto } from './dto/find-orders-query.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiBearerAuth() // <-- Tells Swagger to use the Bearer Token
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List orders with paging and filters' })
  findAll(@Query() query: FindOrdersQueryDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'One order by id' })
  @ApiResponse({ status: 200, description: 'Returned the order' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Place a new order' })
  @ApiCreatedResponse({ description: 'Created successfully' })
  @ApiBadRequestResponse({ description: 'Validation failed (bad data)' })
  create(
    @Body() dto: CreateOrderDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newOrder = this.ordersService.create(dto);
    res.header('Location', `/api/v1/orders/${newOrder.id}`);
    return newOrder;
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of an order' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.ordersService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order (Requires Auth)' })
  @HttpCode(HttpStatus.NO_CONTENT)
  cancel(@Param('id', ParseIntPipe) id: number): void {
    this.ordersService.cancel(id);
  }
}

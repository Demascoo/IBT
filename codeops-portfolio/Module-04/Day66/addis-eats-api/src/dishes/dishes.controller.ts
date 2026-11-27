import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Public } from '../auth/public.decorator'; // <--- Import Public
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';

@Public() // <--- ANYONE can view dishes
@ApiTags('dishes')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  @ApiOperation({ summary: 'List all dishes with paging' })
  @ApiResponse({ status: 200, description: 'Returns a list of dishes' })
  findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;
    return this.dishesService.findAll(parsedLimit, parsedOffset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one dish by ID' })
  @ApiResponse({ status: 200, description: 'Returns the dish' })
  @ApiNotFoundResponse({ description: 'Dish not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new dish' })
  @ApiCreatedResponse({ description: 'Dish created successfully' })
  create(@Body() dto: CreateDishDto) {
    return this.dishesService.create(dto);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Res,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { Public } from '../auth/public.decorator';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ImageFileValidator } from '../common/validators/image-file.validator';

@Public()
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(@Query('isOpen') isOpen?: string) {
    const parsedIsOpen =
      isOpen === 'true' ? true : isOpen === 'false' ? false : undefined;
    return this.restaurantsService.findAll(parsedIsOpen);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.findOne(id);
  }

  @Post()
  create(
    @Body() dto: CreateRestaurantDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newRestaurant = this.restaurantsService.create(dto);
    res.header('Location', `/api/v1/restaurants/${newRestaurant.id}`);
    return newRestaurant;
  }

  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new ImageFileValidator({})],
        errorHttpStatusCode: 422,
      }),
    )
    file: any, // <--- Use 'any' here to bypass the strict Express namespace error
  ) {
    return this.restaurantsService.setImage(id, file);
  }
}

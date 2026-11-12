import {
  IsString,
  IsIn,
  IsInt,
  Min,
  IsOptional,
  Matches,
  IsArray,
} from 'class-validator';
import type { Area, Dish } from '../order.types';
import { AREAS } from '../order.types';

export class CreateOrderDto {
  @IsString()
  customer!: string;

  @IsIn(AREAS)
  area!: Area;

  @IsInt()
  @Min(1)
  totalSantim!: number;

  @IsArray()
  dishes!: Dish[];

  @IsOptional()
  @Matches(/^(\+251|0)9\d{8}$/, {
    message: 'phone must be a valid TeleBirr number',
  })
  phone?: string;
}

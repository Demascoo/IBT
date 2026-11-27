import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { fileTypeFromBuffer } from 'file-type';
import type { StorageService } from '../common/storage/storage.service';
import { STORAGE_SERVICE } from '../common/storage/storage.service';
import { RESTAURANT_REPOSITORY } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY) private readonly repo: any,
    @Inject(STORAGE_SERVICE) private readonly storage: StorageService,
  ) {}

  findAll(isOpen?: boolean) {
    let rows = this.repo.all();
    if (isOpen !== undefined) {
      rows = rows.filter((r: any) => r.isOpen === isOpen);
    }
    return rows;
  }

  findOne(id: number) {
    const hit = this.repo.byId(id);
    if (!hit) throw new NotFoundException(`Restaurant ${id} not found`);
    return hit;
  }

  create(dto: CreateRestaurantDto) {
    const nextId = Math.max(0, ...this.repo.all().map((r: any) => r.id)) + 1;
    return this.repo.save({ ...dto, id: nextId, isOpen: dto.isOpen ?? true });
  }

  // Use custom type bypass
  async setImage(id: number, file: any) {
    const restaurant = this.repo.byId(id);
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    const type = await fileTypeFromBuffer(file.buffer);
    if (!type) throw new Error('Invalid file format');

    const uniqueId = crypto.randomUUID();
    const extension = type.ext;
    const key = `restaurants/${uniqueId}.${extension}`;

    await this.storage.put(key, file.buffer, type.mime);

    restaurant.imageKey = key;
    return this.repo.save(restaurant);
  }
}

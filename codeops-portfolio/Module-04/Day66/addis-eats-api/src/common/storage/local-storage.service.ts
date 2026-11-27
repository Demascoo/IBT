import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

@Injectable()
export class LocalStorageService implements StorageService {
  private readonly root = path.join(process.cwd(), 'uploads');

  constructor() {
    // This MUST be here to create the folder
    fs.mkdir(this.root, { recursive: true }).catch(console.error);
  }

  async put(key: string, body: Buffer, contentType: string): Promise<void> {
    const fullPath = path.join(this.root, key);
    // It also needs to create the subfolder (e.g., 'restaurants')
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    if (!fullPath.startsWith(this.root)) {
      throw new Error('Path escape attempt!');
    }
    await fs.writeFile(fullPath, body);
  }

  async delete(key: string): Promise<void> {
    const fullPath = path.join(this.root, key);
    await fs.unlink(fullPath).catch(() => {
      /* ignore if missing */
    });
  }

  urlFor(key: string): string {
    return `/uploads/${key}`;
  }
}

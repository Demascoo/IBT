import { FileValidator } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

export class ImageFileValidator extends FileValidator<Record<string, any>> {
  // Use a custom interface to bypass strict Express namespace errors
  async isValid(file?: any): Promise<boolean> {
    if (!file || !file.buffer) return false;

    const type = await fileTypeFromBuffer(file.buffer);
    if (!type) return false;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    return allowed.includes(type.mime);
  }

  buildErrorMessage(): string {
    return 'File must be a valid JPEG, PNG, or WebP image.';
  }
}

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TELEBIRR } from '../validators/is-telebirr.validator';

@Injectable()
export class ParseTeleBirrPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!TELEBIRR.test(value)) {
      throw new BadRequestException(
        'Validation failed: Not a valid TeleBirr number',
      );
    }
    return value;
  }
}

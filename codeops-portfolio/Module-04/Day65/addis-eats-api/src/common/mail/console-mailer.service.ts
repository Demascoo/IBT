import { Injectable, Logger } from '@nestjs/common';
import { MailerService, SendMailInput } from './mailer.interface';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

@Injectable()
export class ConsoleMailerService implements MailerService {
  private readonly logger = new Logger('Mail');
  private readonly root = path.join(process.cwd(), 'tmp', 'mail');

  constructor() {
    fs.mkdir(this.root, { recursive: true }).catch(console.error);
  }

  async send(input: SendMailInput): Promise<void> {
    // 1. Mask the email address in the log for security
    const maskedTo = input.to.replace(/(.{2})(.*)(@.*)/, '$1***$3');

    this.logger.log(`to=${maskedTo} subject="${input.subject}"`);

    // 2. Write the HTML to a file so you can preview it in a browser
    const filename = `${Date.now()}-${input.subject.replace(/\s+/g, '-')}.html`;
    const fullPath = path.join(this.root, filename);
    await fs.writeFile(fullPath, input.html);

    // 3. Write the plain text version
    await fs.writeFile(fullPath.replace('.html', '.txt'), input.text);
  }
}

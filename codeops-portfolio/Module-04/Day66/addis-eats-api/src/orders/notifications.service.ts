import { Injectable, Inject, Logger } from '@nestjs/common';
import type { MailerService } from '../common/mail/mailer.interface';
import { MAILER } from '../common/mail/mailer.interface';
import type { Order } from './order.types';
import type { User } from '../users/user.types';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(@Inject(MAILER) private readonly mailer: MailerService) {}

  async sendOrderConfirmation(order: Order, user: User) {
    const subject = `Your order #${order.id} is confirmed - ${this.formatEtb(order.totalSantim)}`;

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Your order is confirmed</h1>
        <p>Hello ${order.customer},</p>
        <p>Your order from Addis Eats is being prepared.</p>
        <p><strong>Total:</strong> ${this.formatEtb(order.totalSantim)}</p>
        <p><strong>Delivering to:</strong> ${order.area}</p>
        <p>Order #${order.id}</p>
      </div>
    `;

    const text = `
      Your order is confirmed.
      Hello ${order.customer},
      Total: ${this.formatEtb(order.totalSantim)}
      Delivering to: ${order.area}
      Order #${order.id}
    `;

    // Fire and forget: We don't await this so the customer isn't delayed
    this.mailer
      .send({
        to: user.email,
        subject,
        html,
        text,
      })
      .catch((err) => {
        this.logger.error(`Failed to send email to ${user.email}`, err);
      });
  }

  private formatEtb(santim: number): string {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
    }).format(santim / 100);
  }
}

export interface SendMailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
  idempotencyKey?: string;
}

export const MAILER = 'MAILER';

export interface MailerService {
  send(input: SendMailInput): Promise<void>;
}

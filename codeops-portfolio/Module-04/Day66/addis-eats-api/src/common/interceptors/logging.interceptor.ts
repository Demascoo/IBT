import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 1. If this is a WebSocket, skip the HTTP logging entirely
    if (context.getType() === 'ws') {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest();

    // 2. Guard against missing headers (just in case)
    if (!req || !req.headers) {
      return next.handle();
    }

    const started = Date.now();
    const id = (req.headers['x-request-id'] as string) ?? 'unknown';
    const handler = `${context.getClass().name}.${context.getHandler().name}`;

    return next.handle().pipe(
      tap({
        next: () => this.log(req, handler, id, started, 'OK'),
        error: (err: any) =>
          this.log(req, handler, id, started, err.name || 'ERROR'),
      }),
    );
  }

  private log(
    req: any,
    handler: string,
    id: string,
    started: number,
    outcome: string,
  ) {
    const ms = Date.now() - started;
    this.logger.log(
      `${req.method} ${req.url} > ${handler} (${outcome}) +${ms}ms [${id}]`,
    );
  }
}

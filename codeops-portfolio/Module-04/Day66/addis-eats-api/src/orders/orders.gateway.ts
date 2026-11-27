import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import type { Order } from './order.types';

@WebSocketGateway({
  namespace: 'orders',
  cors: {
    origin: '*', // Allow all origins for testing
    credentials: true,
  },
})
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger('OrdersGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('watchOrder')
  async handleWatchOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { orderId: number },
  ) {
    await client.join(`order:${data.orderId}`);

    // EXPLICITLY EMIT the success message back to this client
    client.emit('watching', { orderId: data.orderId });
  }

  @OnEvent('order.status_changed')
  handleOrderStatusChanged(order: Order) {
    // Push the update to everyone in the room
    this.server.to(`order:${order.id}`).emit('orderStatusUpdated', {
      orderId: order.id,
      status: order.status,
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`Pushed status update for order ${order.id} to room`);
  }
}

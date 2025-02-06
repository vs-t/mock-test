import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { Subscription } from 'rxjs';
import { SocketClient } from './socket-client';

enum SocketRoom {
  AUTO_ASSIGN_TICKET = 'auto_assign_ticket',
}

@WebSocketGateway(3001, { cors: ['http://localhost:4567'] })
export class SocketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  private connections: Set<Socket> = new Set();
  private assignTicketSubscription: Subscription;

  constructor(
    private readonly socketService: SocketService,
    private readonly socketClient: SocketClient,
  ) {}

  onModuleInit(): void {
    this.server.on('connection', (socket: Socket) => {
      console.log('Connected socket.id: ', socket.id);
      this.connections.add(socket);

      if (socket.handshake.headers['room']) {
        console.log('socket room: ', socket.handshake.headers['room']);
        socket.join(socket.handshake.headers['room']);
      }

      socket.once('disconnect', () => {
        console.log('Disconnect socket.id: ', socket.id);
        this.connections.delete(socket);
      });

      this.assignTicketSubscription = this.socketClient.assignTicket.subscribe(
        this.sendAssignTicket.bind(this),
      );
    });

    this.server.on('error', (socket) => {
      console.log('Error socket.id: ', socket.id);
    });
  }

  @SubscribeMessage('operator_status')
  operatorStatus(
    @MessageBody()
    data: {
      event: string;
      data: { operatorId: number; status: string; ticketCount: number };
    },
  ) {
    this.socketService.operatorStatus(data);
  }

  private sendAssignTicket(payload: { operatorId: number; ticketId: number }) {
    this.server.emit('assign_ticket', payload);
  }
}

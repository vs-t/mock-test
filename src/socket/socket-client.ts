import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class SocketClient implements OnModuleInit {
  public client: Socket | null = null;
  private assignTicketSubject = new BehaviorSubject<{
    operatorId: number;
    ticketId: number;
  } | null>(null);
  get assignTicket(): Observable<{
    operatorId: number;
    ticketId: number;
  } | null> {
    return this.assignTicketSubject.asObservable();
  }

  constructor() {
    this.client = io(process.env.SOCKET_SERVER, {
      extraHeaders: {
        'p-secure-key': process.env.SOCKET_SECURE_KEY,
      },
    });
  }

  onModuleInit(): any {
    this.registerCostumerEvents();
  }

  private registerCostumerEvents() {
    this.client.emit('greeting', 'Привіт');
    this.client.on('connect', () => {
      console.log('Connected to Gateway!');
    });

    this.client.on(
      'assign_ticket',
      (payload: { operatorId: number; ticketId: number }) => {
        console.log(payload);
        this.assignTicketSubject.next(payload);
      },
    );

    this.client.on('date', (payload: any) => {
      console.log(payload);
    });
  }
}

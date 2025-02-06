import { Injectable } from '@nestjs/common';
import { SocketClient } from './socket-client';

@Injectable()
export class SocketService {
  constructor(private readonly socketClient: SocketClient) {}

  operatorStatus(payload: {
    event: string;
    data: { operatorId: number; status: string; ticketCount: number };
  }) {
    this.socketClient.client.emit(payload.event, payload.data);
  }
}

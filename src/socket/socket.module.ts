import { Module } from '@nestjs/common';
import { SocketClient } from './socket-client';
import { SocketGateway } from './socket-gateway';
import { SocketService } from './socket.service';

@Module({
  providers: [SocketClient, SocketGateway, SocketService],
})
export class SocketModule {}

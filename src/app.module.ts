import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { TokenController } from './toket.controller';
import { OAuthIntegrationModule } from './oauth-integration-token';
import { IntegrateService } from './integrate.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './oauth-integration-token/token-service/config';

@Module({
  imports: [SocketModule, ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }),
    OAuthIntegrationModule],
  controllers: [AppController, TokenController],
  providers: [AppService, IntegrateService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { HttpService } from './token-service/http.service';
import { IntegrationToken } from './token-service/integration-token';
import { FirstServices } from './token-service';
import { SecondServices } from './token-service/second-service';

@Module({
  imports: [],
  providers: [HttpService, IntegrationToken, FirstServices, SecondServices],
  exports: [FirstServices, SecondServices, HttpService],
})
export class OAuthIntegrationModule {}

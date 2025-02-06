import { Module } from '@nestjs/common';
import { HttpService } from './token-service/http.service';
import { TokenServices } from './token-service';
import { FirstTokenService } from './token-service/first-token-service';
import { SecondTokenService } from './token-service/second-token-service';
import { IntegrationToken } from './token-service/integration-token';

@Module({
  imports: [],
  providers:[HttpService, IntegrationToken, TokenServices, FirstTokenService, SecondTokenService],
  exports:[TokenServices]
})
export class OAuthIntegrationModule {}

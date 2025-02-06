import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IdentityParams, IntegrationType } from './models';
import { SecondTokenService } from './second-token-service';
import { FirstTokenService } from './first-token-service';

@Injectable({})
export class TokenServices {
  private readonly logger = new Logger(TokenServices.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly firstTokenService: FirstTokenService,
    private readonly secondTokenService: SecondTokenService,
  ) {
    const {
      url: p_url,
      client_id: p_client_id,
      client_secret: p_client_secret,
      grant_type: p_grant_type,
    } = this.configService.get<IdentityParams>('0') ??
    ({} as IdentityParams);
    this.firstTokenService.initSate(
      IntegrationType.first,
      p_url,
      p_client_id,
      p_client_secret,
      p_grant_type,
    );

    const {
      url: l_url,
      client_id: l_client_id,
      client_secret: l_client_secret,
      grant_type: l_grant_type,
      scope: l_scope,
    } = this.configService.get<IdentityParams>('1') ??
    ({} as IdentityParams);
    this.secondTokenService.initSate(
      IntegrationType.second,
      l_url,
      l_client_id,
      l_client_secret,
      l_grant_type,
      l_scope,
    );
  }

  getToken(type: IntegrationType) {
    switch (type) {
      case IntegrationType.first: {
        return this.firstTokenService.getToken();
      }
      case IntegrationType.second: {
        return this.secondTokenService.getToken();
      }
      default: {
        return Promise.resolve('');
      }
    }
  }
}

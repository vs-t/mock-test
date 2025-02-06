import { Injectable } from '@nestjs/common';
import { IntegrationToken } from './integration-token';
import { IntegrationType } from './models';

@Injectable({})
export class SecondTokenService extends IntegrationToken {
  initSate(
    integrationName: IntegrationType,
    url: string,
    client_id: string,
    client_secret: string,
    grant_type: string,
    scope?: string,
  ) {
    super.initSate(
      integrationName,
      url,
      client_id,
      client_secret,
      grant_type,
      scope,
    );
  }
}

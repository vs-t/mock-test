import { Injectable, Logger, OnModuleInit, Scope } from '@nestjs/common';
import * as querystring from 'querystring';
import { ParsedUrlQueryInput } from 'querystring';
import { IdentityToken, IntegrationType } from './models';
import { HttpService } from './http.service';

@Injectable({ scope: Scope.TRANSIENT })
export class IntegrationToken implements OnModuleInit {
  private readonly logger = new Logger(IntegrationToken.name);
  private tokenPromise: Promise<IdentityToken> | null = null;
  private token = '';
  private tokenDate: number;
  private integrationName: IntegrationType;
  private url: string;
  private client_id: string;
  private client_secret: string;
  private grant_type: string;
  private scope: string | null;

  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    console.log(`IntegrationToken] has been initialized, integrationName: ${this.integrationName}`);
  }

  initSate(
    integrationName: IntegrationType,
    url: string,
    client_id: string,
    client_secret: string,
    grant_type: string,
    scope?: string
  ) {
    this.integrationName = integrationName;
    this.url = url;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.grant_type = grant_type;
    this.scope = scope ?? null;
  }

  private async isExpired(): Promise<boolean> {
    if (!this.tokenPromise) {
      return true;
    }

    const { expires_in } = await this.tokenPromise;

    return Date.now() > this.tokenDate + expires_in * 1000;
  }

  private async fetchToken(): Promise<IdentityToken> {
    const params: ParsedUrlQueryInput = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: this.grant_type
    };

    if (this.scope) {
      params.scope = this.scope;
    }

    return this.httpService.reFetch<IdentityToken>({
      url: this.url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: querystring.stringify(params)
    });
  }

  public async getToken(isSilence = false, count = 0): Promise<string> {
    if (isSilence || (await this.isExpired())) {
      try {
        console.log('[IntegrationToken].getToken start');
        this.tokenPromise = this.fetchToken().then((r) => {
          const { access_token, token_type, count } = r;
          this.tokenDate = Date.now();
          this.token = `${token_type} ${access_token}`;
          console.log('count: ', count);

          return r;
        });
        const { access_token, token_type } = await this.tokenPromise;

        if (typeof access_token !== 'string' || typeof token_type !== 'string') {
          this.tokenPromise = null;
          throw new Error(`access_token '${access_token}' or token_type '${token_type}' is invalid`);
        }
      } catch (error) {
        this.logger.error(`failed request of getToken for ${this.integrationName}`);
        this.logger.error(`getToken, message: ${error.message}`);

        if (count < 3) {
          return this.getToken(isSilence, count + 1);
        }

        throw error;
      }
    }

    return this.token;
  }
}

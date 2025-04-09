import { Body, Controller, Post } from '@nestjs/common';
import { IdentityToken } from './oauth-integration-token';

@Controller()
export class TokenController {
  count = 0;

  @Post('first_integration_service_token')
  async first_integration_service_token(
    @Body() body: any,
  ): Promise<IdentityToken> {
    console.log('[first_integration_service_token]');
    return {
      access_token: crypto.randomUUID() as string,
      expires_in: 1,
      token_type: 'Bearer',
      scope: '',
      count: ++this.count,
    };
  }

  @Post('second_integration_service_token')
  async second_integration_service_token(
    @Body() body: any,
  ): Promise<IdentityToken> {
    console.log('[second_integration_service_token]');
    return {
      access_token: crypto.randomUUID() as string,
      expires_in: 6000,
      token_type: 'Bearer',
      scope: '',
    };
  }
}

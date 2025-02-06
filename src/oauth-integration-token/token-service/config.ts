import { IdentityParams } from './models';

export const configuration= (): IdentityParams[] => [
    {
      url: 'http://localhost:3000/first_integration_service_token',
      client_id: '1',
      client_secret: '1',
      grant_type: 'client_credentials',
      scope: ''
    },
    {
      url: 'http://localhost:3000/second_integration_service_token',
      client_id: '2',
      client_secret: '2',
      grant_type: 'client_credentials',
      scope: ''
    }
  ]

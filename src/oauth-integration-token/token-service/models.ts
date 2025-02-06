export const enum IntegrationType {
  first = 'firstService',
  second = 'secondService',
}
export interface IdentityParams {
  url: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
  scope?: string;
}
export interface Configuration {
  firstTokenService: IdentityParams,
  secondTokenService: IdentityParams,
}
export interface IdentityToken {
  access_token: string;
  expires_in: number; //36000
  token_type: 'Bearer';
  scope: string;
  count?: number; //tmp for debug
}

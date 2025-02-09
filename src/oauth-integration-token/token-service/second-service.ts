import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IdentityParams } from './models';
import { IntegrationToken } from './integration-token';
import { HttpService } from './http.service';
import axios from 'axios';

@Injectable({})
export class SecondServices {
  private readonly logger = new Logger(SecondServices.name);
  private tokenService: IntegrationToken;

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.tokenService = new IntegrationToken(this.httpService);
    const {
      url: p_url,
      client_id: p_client_id,
      client_secret: p_client_secret,
      grant_type: p_grant_type,
    } = this.configService.get<IdentityParams>('1') ?? ({} as IdentityParams);
    this.tokenService.initSate(
      p_url,
      p_client_id,
      p_client_secret,
      p_grant_type,
    );
  }

  async getData(id: string) {
    try {
      console.log('new request for id: ', id);
      const { access_token, token_type } =
        await this.tokenService.getTokenPromise();
      const authorization = `${token_type} ${access_token}`;
      console.log(authorization);
      const { data } = await axios.get(`http://localhost:3000/profile/${id}`, {
        headers: { authorization },
      });

      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async get_data_1(data: any) {
    //для коректної поведінки 35 срічку потрібно розкоментувати
    // але мета: досягти того ж ефекту але без 35 строки
    // console.log('Authorization: ', await this.getAuthorization());
    const ids = ['1', '2', '3', '4', '5'];
    const promises: Promise<any>[] = ids.map((id) => this.getData(id));
    ///[Primse1, Promise2, Promise3, Promise4, Promise5]
    return Promise.all(promises);
  }
}

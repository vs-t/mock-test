import { Injectable } from '@nestjs/common';
import { IntegrationType, TokenServices } from './oauth-integration-token';
import axios from 'axios';

@Injectable()
export class IntegrateService {
  constructor(private readonly tokenServices: TokenServices) {}

  private getAuthorization(): Promise<string> {
    return this.tokenServices.getToken(IntegrationType.first);
  }

  private async getData(id: string) {
    try {
      console.log('new request for id: ', id);
      const authorization = await this.getAuthorization();
      console.log(authorization);
      const { data } = await axios.get(
        `http://localhost:3000/profile/${id}`,
        {
          headers: { authorization },
        }
      );

      return data
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async get_data_1(data: any) {
    //для коректної поведінки 35 срічку потрібно розкоментувати
    // але мета: досягти того ж ефекту але без 35 строки
    // console.log('Authorization: ', await this.getAuthorization());
    const ids = ['1','2','3','4','5'];
    const promises:Promise<any>[] = ids.map((id) => this.getData(id));

    return Promise.all(promises);
  }
}

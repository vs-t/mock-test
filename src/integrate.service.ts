import { Injectable } from '@nestjs/common';
import { FirstServices } from './oauth-integration-token';

@Injectable()
export class IntegrateService {
  constructor(private readonly firstService: FirstServices) {}

  async get_data_1(data: any) {
    return this.firstService.get_data_1(data);
  }
}

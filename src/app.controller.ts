import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { AppService } from './app.service';
import axios from 'axios';
import { IntegrateService } from './integrate.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly integrateService: IntegrateService,
  ) {}

  @Post()
  async randomAnswer(@Body() body: any): Promise<any> {
    return this.appService.random03Answer(body);
  }

  @Get()
  async get(@Query() query: any) {
    const uniqueIds = new Set([122, 222, 111, 111]);
    try {
      const { data } = await axios.get('http://localhost:3000/api', {
        params: {
          ids: [...uniqueIds].join(','),
        },
        headers: { 'own-header': 22222 },
      });
      console.log('data: ', data);
    } catch (error) {
      console.log(error);
    }
    console.log('query: ', query);
    return this.appService.random03Answer(query);
  }

  @Get('api')
  async getApi(@Req() req: RequestExpress) {
    console.log('req: ', req.headers);
    console.log(`${req.protocol}://${req.get('Host')}${req.originalUrl}`);
    return '!';
  }

  @Get('zendesk_token')
  async get_zendesk_token(@Query() query: any): Promise<any> {
    console.log('query: ', query);
    return { statusText: 'ok' };
  }

  @Get('base/api/zendesk_token')
  async get_base_api_zendesk_token(
    @Request() request: any,
    @Query() query: any,
  ): Promise<any> {
    console.log('request: ', request.headers);
    console.log('query: ', query);
    return { statusText: 'ok', description: 'base/api/zendesk_token' };
  }

  @Post('zendesk_token')
  async post_zendesk_token(@Body() body: any): Promise<any> {
    console.log('body: ', body);
    return { statusText: 'ok' };
  }

  @Post('delay')
  async delay(@Body() body: any): Promise<any> {
    console.log('body: ', body);
    return this.appService.delayResponse();
  }

  @Get('api/apps/sorryBonusMacros')
  async sorryBonusMacros(@Request() request: any): Promise<any> {
    console.log('sorryBonusMacros request: ', request);
    return [];
  }

  @Get('get_data_1')
  async get_data_1(@Query() query: any): Promise<any> {
    // console.log('[get_data_1] query: ', query);
    return this.integrateService.get_data_1(query);
  }

  @Get('profile/:id')
  async profileById(@Param('id') id: string): Promise<any> {
    return `ok ${id}`;
  }
}

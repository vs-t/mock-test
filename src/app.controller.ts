import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async randomAnswer(@Body() body: any): Promise<any> {
    return this.appService.random03Answer(body);
  }

  @Get()
  async get(@Query() query: any) {
    return this.appService.random03Answer(query);
  }

  @Post('zendesk_token')
  async zendesk_token(@Body() body: any): Promise<any> {
    console.log('body: ', body);
    return { statusText: 'ok' };
  }

  @Post('delay')
  async delay(@Body() body: any): Promise<any> {
    console.log('body: ', body);
    return this.appService.delayResponse();
  }
}

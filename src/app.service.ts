import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async delayResponse(ms = 6000) {
    await this.delay(ms);

    return { statusText: 'ok' };
  }

  async random03Answer(data: any) {
    const isSuccess = Math.random() < 0.3;
    console.log(isSuccess);

    if (isSuccess) {
      return {
        ...data,
        status: 'OK',
      };
    } else {
      throw new HttpException('Помилка', 404);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }
}

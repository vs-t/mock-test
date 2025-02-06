import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';
import { delay } from './delay';

export const DEFAULT_TIMEOUT_MS = 20_000;

export interface RetryOptions {
  count: number;
  delay: number;
}

const RETRY_OPTIONS: RetryOptions = {
  count: 3,
  delay: 500
};

const SILENT_ERROR_STATUSES: HttpStatusCode[] = [
  HttpStatusCode.BadRequest,
  HttpStatusCode.Unauthorized,
  HttpStatusCode.Forbidden
];

@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name);

  private async _reFetch<T = any>(
    config: AxiosRequestConfig,
    retryOptions: RetryOptions = RETRY_OPTIONS
  ): Promise<AxiosResponse<T> | undefined> {
    for (let count = 1; count <= retryOptions.count; count++) {
      let response: AxiosResponse<T>;
      try {
        response = await axios.request<T>(config);
      } catch (error) {
        this.logger.error(`message: ${error.message}, url: ${config.url}`);
        if (
          count < retryOptions.count &&
          error.response &&
          SILENT_ERROR_STATUSES.indexOf(error.response?.status) === -1
        ) {
          await delay(retryOptions.delay);
          continue;
        }

        throw error;
      }

      return response;
    }
  }

  async reFetch<T = any>(config: AxiosRequestConfig, fullResponse: true): Promise<AxiosResponse<T> | T>;
  async reFetch<T = any>(config: AxiosRequestConfig, fullResponse: false): Promise<T>;
  async reFetch<T = any>(config: AxiosRequestConfig): Promise<T>;
  async reFetch<T = any>(
    config: AxiosRequestConfig,
    fullResponse?: boolean,
    retryOptions: RetryOptions = RETRY_OPTIONS
  ): Promise<AxiosResponse<T> | T> {
    const response =
      (await this._reFetch({ timeout: DEFAULT_TIMEOUT_MS, ...config }, retryOptions)) ?? ({} as AxiosResponse<T>);

    return fullResponse ? response : response.data;
  }

  fetch<T = any>(config: AxiosRequestConfig, fullResponse: true): Promise<AxiosResponse<T>>;
  fetch<T = any>(config: AxiosRequestConfig, fullResponse: false): Promise<T>;
  fetch<T = any>(config: AxiosRequestConfig): Promise<T>;
  fetch<T = any>(config: AxiosRequestConfig, fullResponse?: boolean): Promise<AxiosResponse<T> | T> {
    return axios
      .request<T>({ timeout: DEFAULT_TIMEOUT_MS, ...config })
      .then((response) => (fullResponse ? response : response.data));
  }
}

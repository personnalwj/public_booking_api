import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { RequestAxiosConfig } from 'node-mailjet/declarations/request/Request';
import { KindeErrors } from './interfaces/kinde.error.interface';
import { kindeErrorFormatter } from 'src/helpers/error.formatters';

Injectable();
export class KindeClient {
  private clientId = process.env.KINDE_CLIENT_ID;
  private clientSecret = process.env.KINDE_CLIENT_SECRET;

  private logger = new Logger('kindeClient');
  private axiosKinde = axios.create({
    baseURL: `${process.env.KINDE_DOMAIN}/api/v1`,
  });

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.axiosKinde.interceptors.request.use(async (config) => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept'] = 'application/json';
      return config;
    });
    this.axiosKinde.interceptors.request.use(async (config) => {
      this.logger.log(`Request to Kinde: ${JSON.stringify(config)}`);
      return config;
    });
    this.axiosKinde.interceptors.response.use(
      (response) => {
        this.logger.log(
          `Response from Kinde: ${JSON.stringify(response.data)}`,
        );
        return response;
      },
      (error: {
        response: {
          data: KindeErrors;
          status: number;
        };
        request: {
          data: KindeErrors;
        };
        message: string;
      }) => {
        if (error.response) {
          this.logger.error(
            `[kinde_axios_response_error]: ${JSON.stringify({
              data: error.response.data,
              status: error.response.status,
            })}`,
          );
        } else if (error.request) {
          // console.log('error.request', error.request);
          this.logger.error(
            `[kinde_axios_request_error]: ${JSON.stringify(error.request)}`,
          );
        } else {
          this.logger.error(`[kinde_axios_error]: ${error.message}`);
        }
        return Promise.reject(
          kindeErrorFormatter(error.response.data, error.response.status),
        );
      },
    );
  }

  async getAccessToken(): Promise<string> {
    try {
      const accessToken = await this.cacheManager.get('kinde_access_token');
      if (accessToken) {
        this.logger.log(
          `Access Token from cache: ${JSON.stringify(accessToken)}`,
        );
        return accessToken as string;
      }
      return this.fetchAccessToken();
    } catch (error) {
      this.logger.error(`Error fetching Access Token: ${error}`);
      throw error;
    }
  }

  private async fetchAccessToken(): Promise<string> {
    try {
      const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: `${process.env.KINDE_DOMAIN}/api`,
      });
      const response = await axios.post(
        `${process.env.KINDE_DOMAIN}/oauth2/token`,
        body,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      await this.cacheManager.set(
        'kinde_access_token',
        response.data.access_token,
        response.data.expires_in,
      );
      this.logger.log(`Access Token fetched: ${JSON.stringify(response.data)}`);
      return response.data.access_token;
    } catch (error) {
      throw error;
    }
  }

  async get<T>(url: string, config?: Partial<RequestAxiosConfig>): Promise<T> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await this.axiosKinde.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ...config,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(url: string, config?: Partial<RequestAxiosConfig>): Promise<T> {
    try {
      const accessToken = await this.getAccessToken();
      const { data, ...axiosConfig } = config;
      const response = await this.axiosKinde.post(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ...axiosConfig,
      });
      this.logger.log(`[kinde_client_post]: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      this.logger.error(`[kinde_client_post]: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async put<T>(url: string, config?: Partial<RequestAxiosConfig>): Promise<T> {
    try {
      const accessToken = await this.getAccessToken();
      const { data, ...axiosConfig } = config;
      const response = await this.axiosKinde.put(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ...axiosConfig,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

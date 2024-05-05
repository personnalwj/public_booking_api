import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

Injectable();
export class KindeClient {
  private clientId = process.env.KINDE_CLIENT_ID;
  private clientSecret = process.env.KINDE_CLIENT_SECRET;
  private logger = new Logger('kindelClient');

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

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

  async fetchAccessToken(): Promise<string> {
    try {
      const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: 'https://khorganizer-development.eu.kinde.com/api',
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
}

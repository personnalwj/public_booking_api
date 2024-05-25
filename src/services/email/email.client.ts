import axios, { AxiosInstance } from 'axios';
import { Logger } from '@nestjs/common';

export class EmailClient {
  private axiosInstance: AxiosInstance;
  private logger = new Logger(EmailClient.name);
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.ZEPTOMAIL_API_URL,
      headers: {
        Authorization: process.env.ZEPTOMAIL_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.axiosInstance.interceptors.request.use(async (config) => {
      this.logger.log(`Request to MailerSend: ${JSON.stringify(config)}`);
      return config;
    });
    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.logger.log(
          `Response from MailerSend: ${JSON.stringify(response.data)}`,
        );
        return response;
      },
      (error) => {
        this.logger.error(`Error from MailerSend: ${error}`);
        return Promise.reject(error);
      },
    );
  }

  async subscriptionEmail({
    subscriber_email,
    subscriber_name,
    subscriber_phone_number,
  }): Promise<void> {
    try {
      await this.axiosInstance.post('/email/template', {
        from: {
          address: process.env.ZEPTOMAIL_FROM_EMAIL,
          name: 'noreply',
        },
        to: [
          {
            email_address: {
              address: subscriber_email,
              name: subscriber_name,
            },
          },
        ],
        merge_info: {
          subscriber_name: subscriber_name,
          subscriber_email: subscriber_email,
          subscriber_phone_number: subscriber_phone_number,
        },
        template_key:
          '13ef.79a25127c20605f2.k1.13cfef00-195a-11ef-bc90-525400b65433.18fa7bb31f0',
      });
    } catch (error) {
      throw error;
    }
  }

  async welcomeEmail({
    user_email,
    user_name,
    connection_link,
    responsible_name,
    congregation_name,
  }): Promise<void> {
    try {
      await await this.axiosInstance.post('/email/template', {
        from: {
          address: process.env.ZEPTOMAIL_FROM_EMAIL,
          name: 'noreply',
        },
        to: [
          {
            email_address: {
              address: user_email,
              name: user_name,
            },
          },
        ],
        merge_info: {
          connection_link,
          responsible_name,
          congregation_name,
          user_name,
        },
        template_key:
          '13ef.79a25127c20605f2.k1.a8d26ac0-1a76-11ef-bc90-525400b65433.18faf043b6c',
      });
    } catch (error) {
      throw error;
    }
  }
}

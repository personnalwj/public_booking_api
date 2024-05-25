import { APIResponse } from 'mailersend/lib/services/request.service';
import axios, { AxiosInstance } from 'axios';
import { Logger } from '@nestjs/common';

class MailerSendClient {
  private axiosInstance: AxiosInstance;
  private logger = new Logger(MailerSendClient.name);
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.MAILERSEND_API_URL}`,
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
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

  async sendMail(email: string, subject: string): Promise<APIResponse> {
    try {
      return this.axiosInstance
        .post('/email', {
          from: {
            email: 'noreply@tplhelper.com',
          },
          to: [
            {
              email,
            },
          ],
          subject,
          html: '<p>This is just a friendly hello from your friends at {{company}}</p>',
          personalization: [
            {
              email,
              data: {
                company: 'TPL Helper',
              },
            },
          ],
        })
        .then((response) => response.data);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  }

  async subscriptionEmail({
    subscriber_email,
    subscriber_name,
    subscriber_phone,
  }): Promise<void> {
    try {
      await this.axiosInstance.post('/email', {
        from: {
          email: process.env.MAILERSEND_FROM_EMAIL,
        },
        to: [
          {
            email: process.env.MAILERSEND_ADMIN_EMAIL,
          },
        ],
        subject: "Demande d'accès à TPL Assist",
        personalization: [
          {
            email: process.env.MAILERSEND_ADMIN_EMAIL,
            data: {
              subscriber_name: subscriber_name,
              subscriber_email: subscriber_email,
              subscriber_phone: subscriber_phone,
            },
          },
        ],
        template_id: 'zr6ke4n5y1e4on12',
      });
    } catch (error) {
      throw error;
    }
  }

  async welcomeEmail({
    subscriber_email,
    subscriber_name,
    subscriber_phone,
  }): Promise<void> {
    try {
      await this.axiosInstance.post('/email', {
        from: {
          email: process.env.MAILERSEND_FROM_EMAIL,
        },
        to: [
          {
            email: subscriber_email,
          },
        ],
        subject: 'Bienvenue à TPL Assist',
        personalization: [
          {
            email: subscriber_email,
            data: {
              subscriber_name: subscriber_name,
              subscriber_email: subscriber_email,
              subscriber_phone: subscriber_phone,
            },
          },
        ],
        template_id: 'zr6ke4n5y1e4on12',
      });
    } catch (error) {
      throw error;
    }
  }
}

export default MailerSendClient;

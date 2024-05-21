import { APIResponse } from 'mailersend/lib/services/request.service';
import axios, { AxiosInstance } from 'axios';

class MailerSendClient {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.MAILERSEND_API_URL}`,
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
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
}

export default MailerSendClient;

import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailClient } from 'src/services/email/email.client';
import { UserSubscription } from '../interfaces/user.subscription';

export class UsersAccessRequestListener {
  constructor(private readonly emailClient: EmailClient) {
    this.emailClient = new EmailClient();
  }
  private readonly logger = new Logger('UsersAccessRequestListener');
  @OnEvent('user:access_request')
  async handleEventCreated(payload: UserSubscription) {
    try {
      this.logger.log(`[user:access_request]: ${JSON.stringify(payload)}`);
      await this.emailClient.subscriptionEmail({
        subscriber_email: payload.email,
        subscriber_name: `${payload.first_name} ${payload.last_name}`,
        subscriber_phone_number: payload.phone_number,
      });
    } catch (error) {
      this.logger.error(
        `[user:access_request]: ${JSON.stringify(error.response.data)}`,
      );
      throw new InternalServerErrorException(error);
    }
  }
}

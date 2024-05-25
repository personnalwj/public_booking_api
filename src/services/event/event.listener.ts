import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserSubscription } from 'src/resources/users/interfaces/user.subscription';
import { EmailClient } from '../email/email.client';

export class EventListener {
  private emailClient: EmailClient;
  constructor(private readonly logger: Logger) {
    this.logger = new Logger('EventListener');
    this.emailClient = new EmailClient();
  }

  @OnEvent('user:subscribe')
  async handleEventCreated(payload: UserSubscription) {
    try {
      this.logger.log(`[user:subscribe]: ${JSON.stringify(payload)}`);
      await this.emailClient.subscriptionEmail({
        subscriber_email: payload.email,
        subscriber_name: `${payload.first_name} ${payload.last_name}`,
        subscriber_phone_number: payload.phone_number,
      });
    } catch (error) {
      console.log(error.response.data);
      this.logger.error(
        `[user:subscribe]: ${JSON.stringify(error.response.data)}`,
      );
      throw new InternalServerErrorException(error);
    }
  }

  @OnEvent('user:create')
  async handleUserCreated(payload: UserSubscription) {
    try {
      this.logger.log(`[user:create]: ${JSON.stringify(payload)}`);
      await this.emailClient.welcomeEmail({
        user_email: payload.email,
        user_name: `${payload.first_name} ${payload.last_name}`,
        congregation_name: payload.phone_number,
        connection_link: 'https://example.com',
        responsible_name: 'John Doe',
      });
    } catch (error) {
      this.logger.error(`[user:create]: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }
}

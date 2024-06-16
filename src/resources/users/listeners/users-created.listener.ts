import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from 'src/resources/users/entities/user.entity';
import { IUser } from 'src/helpers/types';
import { EmailClient } from 'src/services/email/email.client';

export class UsersCreatedListener {
  constructor(private readonly emailClient: EmailClient) {
    this.emailClient = new EmailClient();
  }
  private readonly logger = new Logger('UsersCreatedListener');

  @OnEvent('user:created')
  async handleUserCreatedEvent(payload: { user: User; admin: IUser }) {
    try {
      this.logger.log(`[user:create]: ${JSON.stringify(payload)}`);
      await this.emailClient.welcomeEmail({
        user_email: payload.user.email,
        user_name: `${payload.user.given_name} ${payload.user.family_name}`,
        congregation_name: payload.user.congregation.name,
        connection_link: `${process.env.FRONTEND_URL}/auth/login?email=${payload.user.email}`,
        responsible_name: payload.admin.email,
      });
    } catch (error) {
      this.logger.error(`[user:create]: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }
}

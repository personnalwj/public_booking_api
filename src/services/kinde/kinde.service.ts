import { Injectable, Logger } from '@nestjs/common';
import { KindeClient } from './kinde.client';
import {
  CreateKindeUserResponse,
  KindeUser,
  KindeUserCreate,
} from './interfaces/kinde.user.interface';

@Injectable()
class KindeService {
  private readonly logger: Logger;
  constructor(private readonly kindeClient: KindeClient) {
    this.logger = new Logger('KindeService');
  }

  async getUserData(): Promise<KindeUser[]> {
    try {
      const users = await this.kindeClient.get<KindeUser[]>('/users');
      this.logger.log(`Users fetched: ${JSON.stringify(users)}`);
      return users;
    } catch (error) {
      this.logger.error(`Error fetching user data: ${error}`);
      throw new Error('Failed to fetch user data');
    }
  }

  async createUser(data: KindeUserCreate): Promise<CreateKindeUserResponse> {
    try {
      const user = await this.kindeClient.post<CreateKindeUserResponse>(
        '/user',
        {
          profile: {
            given_name: data.given_name,
            family_name: data.family_name,
          },
          identities: [
            {
              type: 'email',
              details: {
                email: data.email,
              },
            },
          ],
        },
      );
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verfyWebhookSignature(token: string): Promise<boolean> {
    try {
      const signature = await this.kindeClient.get<string>(
        `/webhook/verify?token=${token}`,
      );
      return signature === 'verified';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default KindeService;

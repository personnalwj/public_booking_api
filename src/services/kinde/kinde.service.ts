import { Injectable, Logger } from '@nestjs/common';
import { KindeClient } from './kinde.client';
import {
  CreateKindeUserResponse,
  KindeUser,
  KindeUserCreate,
  KindeUserSubscription,
  KindeUserSubscriptionResponse,
} from './interfaces/kinde.user.interface';
import { IUser } from 'src/helpers/types';
import { IKindePermission } from './interfaces/kinde.permission.interface';

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
      throw new Error(error.message);
    }
  }

  async createUser(data: KindeUserCreate): Promise<CreateKindeUserResponse> {
    try {
      const user = await this.kindeClient.post<CreateKindeUserResponse>(
        '/user',
        {
          data: {
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
        },
      );
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async subscribeUser(
    userSubscriber: KindeUserSubscription,
  ): Promise<KindeUserSubscriptionResponse> {
    try {
      const response =
        await this.kindeClient.post<KindeUserSubscriptionResponse>(
          '/subscribers',
          {
            params: {
              last_name: userSubscriber.last_name,
              first_name: userSubscriber.first_name,
              email: userSubscriber.email,
            },
          },
        );
      return response;
    } catch (errors) {
      this.logger.error(`[kinde_service_subscribe]: ${JSON.stringify(errors)}`);
      throw errors;
    }
  }

  /**
   *
   * @deprecated
   * @param user
   * @param permissions
   * @returns void
   * @description Updates the user permissions in Kinde but not used for the moment
   */
  async updateUserPermissions(
    user: IUser,
    permissions: IKindePermission[],
  ): Promise<void> {
    try {
      await this.kindeClient.post<void>(
        `/organizations/${process.env.ORGANIZATION_ID}/users`,
        {
          data: {
            users: [
              {
                id: user.sub,
                operation: 'update',
                permissions,
              },
            ],
          },
        },
      );
    } catch (error) {
      this.logger.error(
        `[kinde_service_permissions]: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async updateUsersRoles(
    user: IUser,
    roles: 'admin' | 'responsible'[],
  ): Promise<void> {
    try {
      await this.kindeClient.patch<void>(
        `/organizations/${process.env.KINDE_ORGANIZATION_ID}/users`,
        {
          data: {
            users: [
              {
                id: user.sub,
                operation: 'update',
                roles,
              },
            ],
          },
        },
      );
    } catch (error) {
      this.logger.error(
        `[kinde_service_update_roles]: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }
  async refreshUserClaims(user: IUser): Promise<void> {
    try {
      await this.kindeClient.post<void>(`/users/${user.sub}/refresh_claims`);
    } catch (error) {
      this.logger.error(
        `[kinde_service_refresh_claims]: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }
}

export default KindeService;

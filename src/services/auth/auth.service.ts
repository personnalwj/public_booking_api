import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import UserMeradata from 'supertokens-node/recipe/usermetadata';
import jwt from 'supertokens-node/recipe/jwt';

import { ConfigInjectionToken, AuthModuleConfig } from '../../interfaces/supertokens-config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Dashboard.init(),
        EmailPassword.init({
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signIn: async (input) => {
                  return null;
                },
                signUpPOST: undefined,
              };
            },
          },
        }),
        Session.init({
          exposeAccessTokenToFrontendInCookieBasedAuth: true,
        }),
        UserRoles.init(),
        UserMeradata.init(),
        jwt.init(),
      ],
    });
  }
}

import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import UserMeradata from 'supertokens-node/recipe/usermetadata';
import jwt from 'supertokens-node/recipe/jwt';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import { use } from 'passport';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      debug: true,
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
                signInPOST: async (input) => {
                  const response = await originalImplementation.signInPOST(
                    input,
                  );
                  if (response.status === 'OK') {
                    const { metadata } = await UserMeradata.getUserMetadata(
                      response.user.id,
                    );
                    input.options.res.sendJSONResponse({
                      user: { ...response.user, ...metadata },
                    });
                  }
                  return response;
                },
              };
            },
          },
        }),
        Session.init({
          override: {
            functions: (originalImplementation) => {
              return {
                ...originalImplementation,
                createNewSession: async (input) => {
                  const response =
                    await originalImplementation.createNewSession(input);
                  const { metadata } = await UserMeradata.getUserMetadata(
                    input.userId,
                  );
                  input.accessTokenPayload = {
                    ...input.accessTokenPayload,
                    ...metadata,
                  };
                  return response;
                },
              };
            },
          },
        }),
        UserRoles.init(),
        UserMeradata.init(),
        jwt.init(),
      ],
    });
  }
}

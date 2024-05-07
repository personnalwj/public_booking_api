import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/helpers/types';
import { getUser } from 'supertokens-node';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<IUser> => {
    const request = ctx.switchToHttp().getRequest();
    const user = await getUser(request.session.getUserId());
    return {
      sub: user.id,
      email: user.emails[0],
    };
  },
);

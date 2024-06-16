import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/helpers/types';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<IUser> => {
    const { user } = ctx.switchToHttp().getRequest();
    return {
      sub: user.sub,
      email: user.email,
    };
  },
);

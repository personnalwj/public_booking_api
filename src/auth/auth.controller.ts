import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Session } from '../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { getUser, User } from 'supertokens-node';
import { getUserMetadata } from 'supertokens-node/recipe/usermetadata';
import { IUserMetadata } from './../helpers/types';

@Controller('auth')
export class AuthController {
  @Get('/profile')
  @UseGuards(new AuthGuard({ checkDatabase: true }))
  async getProfile(
    @Session() session: SessionContainer,
  ): Promise<IUserMetadata & User> {
    const { metadata } = await getUserMetadata(session.getUserId());
    const user = await getUser(session.getUserId());
    return {
      ...(metadata as IUserMetadata),
      ...user,
    };
  }
}

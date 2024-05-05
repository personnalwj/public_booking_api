import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KindeClient } from './kinde.client';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CacheModule.register(),
  ],
  providers: [KindeClient],
  exports: [PassportModule, KindeClient],
})
export class AuthzModule {}

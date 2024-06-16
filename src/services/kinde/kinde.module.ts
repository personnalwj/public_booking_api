import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import KindeService from './kinde.service';
import { KindeClient } from './kinde.client';

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: [KindeClient, KindeService],
  exports: [KindeService],
})
export class KindeModule {}

import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtStrategy } from './jwt.strategy';
import { AuthzController } from './authz.controller';
import { json, text } from 'express';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CacheModule.register(),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtStrategy],
  controllers: [AuthzController],
})
export class AuthzModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        const parse = text({
          type: 'application/json',
        });
        parse(req, res, next);
      })
      .forRoutes('authz/access_request');
  }
}

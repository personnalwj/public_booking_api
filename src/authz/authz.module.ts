import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KindeClient } from './kinde.client';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtStrategy } from './jwt.strategy';
import { AuthzGuard } from './guards/authz.guard';
import { RoleGuard } from 'nest-keycloak-connect';
import { PermissionsGuard } from './guards/permisions.guard';
import { Roles } from './decorators/roles.decorators';
import { Permissions } from './decorators/permissions.decorators';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CacheModule.register(),
  ],
  providers: [KindeClient, JwtStrategy],
  exports: [
    PassportModule,
    KindeClient,
    JwtStrategy,
    // AuthzGuard,
    // RoleGuard,
    // PermissionsGuard,
    // // Roles,
    // // Permissions,
  ],
})
export class AuthzModule {}

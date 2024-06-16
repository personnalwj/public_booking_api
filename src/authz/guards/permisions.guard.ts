import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    const permisions = this.reflector.get<string>(
      'permissions',
      context.getHandler(),
    );
    return user.permissions.some((permission) =>
      permisions.includes(permission),
    );
  }
}

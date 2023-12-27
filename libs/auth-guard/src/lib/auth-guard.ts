import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { GlobalPermissions } from '@szikra-backend-nx/permissions';
import { PermissionItem, RequestUser } from '@szikra-backend-nx/types';

import { Permissions } from './permissions.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = this.isAuthenticated(context);
    if (!isAuthenticated) throw new UnauthorizedException();
    const doRolesMatch = this.doRolesMatch(context);
    if (!doRolesMatch) throw new ForbiddenException();
    this.setUser(context);
    return isAuthenticated && doRolesMatch;
  }

  private doRolesMatch(context: ExecutionContext): boolean {
    const entityId = this.getEntityIdFromContext(context);
    const requiredPermissions = this.getRequiredPermissionsFromContext(context);
    const tokenPayload = this.getTokenPayloadFromContext(context);
    return this.hasAllPermissions(
      tokenPayload.permissions ?? [],
      requiredPermissions,
      entityId,
    );
  }

  private isAuthenticated(context: ExecutionContext): boolean {
    const token = this.extractTokenFromHeader(
      context.switchToHttp().getRequest(),
    );
    if (!token) return false;
    return this.isTokenValid(token);
  }

  private isTokenValid(token: string): boolean {
    try {
      const tokenPayload = this.getTokenPayload(token);
      return !!tokenPayload;
    } catch {
      return false;
    }
  }

  private hasAllPermissions(
    permissions: PermissionItem[],
    required: string[],
    id?: string,
  ): boolean {
    if (this.hasSuperuserPermission(permissions)) return true;
    return required.every((requiredPermission) => {
      const permission = permissions.find(
        (permission) => permission.permission === requiredPermission,
      );
      if (!permission) return false;
      if ('global' in permission) {
        return permission.global;
      } else {
        return id && permission.entityId === id;
      }
    });
  }

  private hasSuperuserPermission(permissions: PermissionItem[]) {
    return permissions.some(
      (permission) => permission.permission === GlobalPermissions.SUPERUSER,
    );
  }

  private getRequiredPermissionsFromContext(
    context: ExecutionContext,
  ): string[] {
    return (
      this.reflector.get<string[]>(Permissions, context.getHandler()) ?? []
    );
  }

  private getTokenPayloadFromContext(context: ExecutionContext): RequestUser {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    return this.getTokenPayload(token);
  }

  private getTokenPayload(token: string): RequestUser {
    return this.jwtService.verify(token);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private setUser(context: ExecutionContext): void {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    request.user = this.getTokenPayload(token);
  }

  private getEntityIdFromContext(
    context: ExecutionContext,
  ): string | undefined {
    const request = context.switchToHttp().getRequest();
    return request.params?.id;
  }
}

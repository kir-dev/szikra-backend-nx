import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RequestUser } from '@szikra-backend-nx/types';

import { Roles } from './roles.decorator';

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
    const roles = this.getRolesFromContext(context);
    const tokenPayload = this.getTokenPayloadFromContext(context);
    return this.hasAllPermissions(tokenPayload.permissions ?? [], roles);
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
    permissions: string[],
    required: string[],
  ): boolean {
    return required.every((permission) => permissions.includes(permission));
  }

  private getRolesFromContext(context: ExecutionContext): string[] {
    return this.reflector.get<string[]>(Roles, context.getHandler()) ?? [];
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
}

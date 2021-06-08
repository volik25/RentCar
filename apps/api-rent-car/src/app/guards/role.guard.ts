import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const user: any = request.session.user;
    if (!user) {
      return false;
    }

    if (!roles && user) {
      return true;
    }

    if (!user.role) {
      return false;
    }

    return (
      roles.length > 0 &&
      roles.filter((r) => {
        return user.role === r;
      }).length > 0
    );
  }
}
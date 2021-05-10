import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization && !request.query.token) {
      return false;
    }
    const accessToken = request.headers.authorization || request.query.token;
    if (request.session && request.session.token === accessToken && request.session.user) {
      return true;
    }
  }
}

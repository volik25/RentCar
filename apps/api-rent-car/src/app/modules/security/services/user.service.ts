import {
  BadRequestException, ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as path from 'path';
import { DeepPartial } from 'typeorm';
import jwt = require('jsonwebtoken');
import { ApplicationRequest } from '@rent/api/interfaces/request.interface';
import { UserEntity } from '@rent/interfaces/modules/security/entities/user.entity';
import { CreateUserDTO } from '@rent/interfaces/modules/security/dtos/user.create.dto';
import { UserLoginDTO } from '@rent/interfaces/modules/security/dtos/user.login.dto';
import { UserCryptoService } from '@rent/interfaces/tools/user.crypto.service'
import { logger } from '@rent/interfaces/modules/logger/logger';
import { AccessTokenEntity } from '@rent/interfaces/modules/security/entities/access.token.entity';
import { ResetTokenEntity } from '@rent/interfaces/modules/security/entities/reset.token.entity';

@Injectable()
export class UserService {
  constructor(@Inject(REQUEST) private readonly request: ApplicationRequest) {
  }

  canUserSetRole(user): boolean {

    // if (user.role?.type === RoleType.ADMIN) {
    //   switch (this.request.session.user.role) {
    //     case Role.KIT_ROLE_CONTRACTOR_ADMIN:
    //     case Role.KIT_ROLE_CLIENT_ADMIN:
    //       if (user.role.name === Role.KIT_ROLE_ADMIN) {
    //         allow = false;
    //       }
    //       break;
    //   }
    // }

    return true;
  }

  async create(user: CreateUserDTO) {
    user.password = UserCryptoService.encrypt(user.password);

    if (!this.canUserSetRole(user)) {
      throw new ForbiddenException('Недостаточно прав доступа для создания роли');
    }

    try {
      return await UserEntity.create(user).save();
    } catch (err) {
      logger.error('[UserService]: create: ', err);
      throw new BadRequestException(err.message);
    }
  }

  async update(id: number, user: DeepPartial<UserEntity>) {
    let editableUser: UserEntity;

    try {
      editableUser = await UserEntity.findOne(id, { relations: ['clients', 'role'] });
    } catch (err) {
      logger.error('[UserService]: update: ', err);
      throw new BadRequestException(err.message);
    }

    if (!this.canUserSetRole(user)) {
      throw new ForbiddenException('Недостаточно прав доступа для создания роли');
    }

    if (editableUser.password) {
      editableUser.password = UserCryptoService.encrypt(user.password);
    }

    try {
      return await UserEntity.update(id, editableUser);
    } catch (err) {
      logger.error('[UserService]: update: ', err);
      throw new BadRequestException(err.message);
    }
  }

  async find(filter?: { roles?: string[] }) {

    let users;
    try {
      users = await UserEntity.find({
        relations: ['role', 'clients']
      });
    } catch (err) {
      logger.error('[UserService]: find: ', err);
      throw new BadRequestException(err.message);
    }

    for (const user of users) {
      user.clients = user.clients.filter(userClient => userClient.deleted === false);
    }

    if (filter && filter.roles && filter.roles.length > 0) {
      users = users.filter(({ role }) => filter.roles.includes(role.name));
    }

    return users;
  }

  async findOne(id: number) {
    let user: UserEntity;
    try {
      user = await UserEntity.findOne(id, { relations: ['role', 'clients', 'scales', 'areas'] });
    } catch (err) {
      logger.error('[UserService]: findOne: ', err);
      throw new BadRequestException(err.message);
    }

    return user

  }

  async login(login: UserLoginDTO) {
    const hash = UserCryptoService.encrypt(login.password);

    logger.info('User request login (login): ' + login.email + ', ' + login.password + ', ' + hash);

    let foundUser;
    try {
      foundUser = await UserEntity.findOne({
        where: { email: login.email }
      });
    } catch (err) {
      logger.error('[UserService]: login: ', err);
      throw new BadRequestException(err.message);
    }

    if (!foundUser) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    let user;
    try {
      user = await UserEntity.findOne({
        where: { email: login.email, password: hash },
        relations: ['role']
      });
    } catch (err) {
      logger.error('[UserService]: login: ', err);
      throw new BadRequestException(err.message);
    }

    if (!user) {
      throw new UnauthorizedException('Неверный пароль');
    }

    if (user && user.deleted) {
      throw new UnauthorizedException('Пользователь заблокирован');
    }

    const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5;

    const tokenData = {
      exp: expiration,
      username: user.name,
      email: user.email,
      id: user.id
    };

    const result = {
      email: user.email,
      expires: expiration,
      token: jwt.sign(tokenData, 'ZaOblako_KIT')
    };

    const t: any = {};

    t.token = result.token;
    t.expires = tokenData.exp;
    t.created = new Date();
    t.user = user;
    await AccessTokenEntity.save(t);

    return { user, token: result.token };
  }

  async logout(req: ApplicationRequest) {
    try {
      await AccessTokenEntity.delete({
        user: { id: +req.session.user.id },
        token: req.session.token
      }).catch(console.error);

      req.destroySession((err) => {
        if (err) {
          console.log(err);
        }
      });
      return '';
    } catch (e) {
      logger.error('Error' + e);
      throw new BadRequestException();
    }
  }

  async check(req) {
    const accessToken = req.headers.authorization;
    if (req.session && req.session.token === accessToken && req.session.user) {
      logger.verbose('User ' + req.session.user.name + ' has session');

      try {
        jwt.verify(accessToken, 'ZaOblako_KIT');

        logger.verbose('Authorized by session (login.check): ' + req.session.user.name);

        return await Promise.resolve(req.session.user);
      } catch (err) {
        throw new ForbiddenException({ message: 'Token expired' });
      }
    } else {
      logger.verbose('User has no session');

      await req.session.regenerate();

      try {
        jwt.verify(accessToken, 'ZaOblako_KIT');
      } catch (err) {
        throw new ForbiddenException({ message: 'Token expired' });
      }

      const token = await AccessTokenEntity.findOne({ where: { token: accessToken }, relations: ['user'] });

      if (token && token.user) {
        const user = await UserEntity.findOne(token.user.id, { relations: ['role', 'clients'] });


        req.user = user;

        req.session.user = user;
        req.session.token = token.token;

        logger.verbose('Authorized by token');

        return user;
      } else {
        throw new ForbiddenException({ message: 'Token not found' });
      }
    }
  }

  public async reset(request, email) {

    logger.info('Password reset requested with email: ' + email);

    let foundUser: UserEntity;
    try {
      foundUser = await UserEntity.findOne({ where: { email } });
    } catch (err) {
      logger.error(err);
      throw new BadRequestException(err.message);
    }


    if (!foundUser) {
      throw new NotFoundException('Пользователь с указанным Вами email не найден');
    }

    const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 3;

    const tokenData = {
      exp: expiration,
      username: foundUser.name,
      email: foundUser.email,
      id: foundUser.id
    };

    const token = jwt.sign(tokenData, 'zaoblako');

    const t: any = {
      token,
      expires: tokenData.exp,
      created: new Date(),
      user: foundUser
    };

    await ResetTokenEntity.save(t);

    const resetUrl = request.protocol + '://' + path.join(request.get('host'), 'reset-password', '?token=' + token);

    return;
  }

  public async resetPassword(token, password) {
    try {
      jwt.verify(token, 'ZaOblako_KIT');
    } catch (err) {
      throw new ForbiddenException({ message: 'Token expired' });
    }

    const resetToken = await ResetTokenEntity.findOne({ where: { token }, relations: ['user'] });

    if (resetToken && resetToken.user) {
      const user: UserEntity = resetToken.user;

      user.password = password;

      await this.update(user.id, user);

      logger.verbose(`Successfully reset the password for user with ID: ${user.id}`);

      return user;
    } else {
      throw new ForbiddenException({ message: 'Token not found' });
    }
  }

  async checkEmail(email) {
    let user;
    try {
      user = await UserEntity.findOne(email);
    } catch (err) {
      logger.error('[UserService]: checkEmail: ', err);
      throw new BadRequestException(err.message);
    }
    if (user) {
      throw new ConflictException('Пользователь с таким e-mail уже существует');
    }
    return true;
  }
}
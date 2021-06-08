import { Body, Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, Inject, Param, ParseArrayPipe, ParseBoolPipe, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtGuard } from '@rent/api/guards/jwt.guard';
import { RoleGuard } from '@rent/api/guards/role.guard';
import { ApplicationRequest } from '@rent/api/interfaces/request.interface';
import { SortUtil } from '@rent/api/utils/sort.util';
import { UserLoginDTO } from '@rent/interfaces/modules/security/dtos/user.login.dto';
import { UserEntity } from '@rent/interfaces/modules/security/entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '@rent/interfaces/modules/security/dtos/user.create.dto';
import { UpdateUserDTO } from '@rent/interfaces/modules/security/dtos/user.update.dto';
import { UserResetDto } from '@rent/interfaces/modules/security/dtos/user.reset.dto';
import { UserResetPasswordDto } from '@rent/interfaces/modules/security/dtos/user.reset-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, @Inject(REQUEST) private readonly request: ApplicationRequest) {
  }

  @Get()
  @UseGuards(JwtGuard, RoleGuard)
  async find() {
    return await this.userService.find();

    // users = SortUtil.sortItems(users, sort);
  }

  @Get(':id')
  @UseGuards(JwtGuard, RoleGuard)
  async findOne(@Param('id', ParseIntPipe) id) {
    return await this.userService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard, RoleGuard)
  async create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RoleGuard)
  async update(@Param('id', ParseIntPipe) id, @Body() user: UpdateUserDTO) {
    return await this.userService.update(id, user);
  }

  @Post('login')
  async login(@Body() login: UserLoginDTO, @Req() req, @Res() res): Promise<{ user: UserEntity; token: string }> {
    const service = await this.userService.login(login);
    req.user = service.user;
    req.token = service.token;

    const user = await UserEntity.findOne(service.user.id, {
      relations: ['role', 'clients', 'areas']
    });

    req.session.user = user;
    req.session.token = service.token;
    return res.send(service);
  }

  @Get('check')
  @UseGuards(JwtGuard)
  async check(@Req() req) {
    return await this.userService.check(req);
  }

  @Post('check-email')
  async checkEmail(@Body() email: { email: string }) {
    return await this.userService.checkEmail(email);
  }

  @Post('reset')
  async reset(@Req() request, @Body('email') email: UserResetDto) {
    return await this.userService.reset(request, email);
  }

  @Post('change')
  async resetPassword(@Body() resetData: UserResetPasswordDto) {
    return await this.userService.resetPassword(resetData.token, resetData.password);
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  @HttpCode(HttpStatus.CREATED)
  async logout(@Req() req: ApplicationRequest) {
    return await this.userService.logout(req);
  }
}
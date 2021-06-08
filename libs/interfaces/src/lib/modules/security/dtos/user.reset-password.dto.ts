import { UserEntity } from '@rent/interfaces/modules/security/entities/user.entity';
import { IsNotEmpty, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';

export class UserResetPasswordDto implements DeepPartial<UserEntity> {

  @IsNotEmpty({
    message: 'Пароль пользователя не может быть пустым'
  })
  @MinLength(6, {
    message: 'Минимальная длина пароля пользователя 6 символов'
  })
  password: string;

  @IsNotEmpty({
    message: 'Не заполнено поле $property'
  })
  token: string;

}

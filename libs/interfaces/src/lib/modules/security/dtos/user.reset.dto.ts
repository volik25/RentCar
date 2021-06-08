import { UserEntity } from '@rent/interfaces/modules/security/entities/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { DeepPartial } from 'typeorm';

export class UserResetDto implements DeepPartial<UserEntity> {

  @IsNotEmpty({
    message: 'Не заполнено поле $property'
  })
  @IsEmail({
    allow_display_name: false
  }, {
    message: 'Некорректно заполнено поле $property'
  })
  email: string;

}

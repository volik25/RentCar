import { RoleType } from '@rent/interfaces/enums/role.enum';
import {
  Entity,
  BaseEntity,
  Generated,
  PrimaryColumn,
  Index,
  Column,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role', {
  schema: 'security',
})
export class RoleEntity extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({
    type: 'bigint',
    transformer: {
      to: (entityValue: number) => entityValue,
      from: (databaseValue: string): number => parseInt(databaseValue, 10),
    },
  })
  id: number;

  @Index('roleTypeIndex')
  @Column('enum', {
    name: 'type',
    nullable: true,
    enum: RoleType,
  })
  type: RoleType;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}

import { Entity, BaseEntity, Generated, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('reset_token', {
    schema: 'security'
  })
  export class ResetTokenEntity extends BaseEntity {
  
    @Generated('increment')
    @PrimaryColumn({
      type: 'bigint',
      transformer: {
        to: (entityValue: number) => entityValue,
        from: (databaseValue: string): number => parseInt(databaseValue, 10),
      },
    })
    id: number;
  
    @Column('text', {
      name: 'token',
      nullable: false
    })
    token: string;
  
    @Column('int', {
      nullable: true
    })
    expires: number;
  
    @Column('timestamp without time zone', {
      nullable: true,
      default: () => '(now() at time zone \'Europe/Moscow\')'
    })
    created: Date;
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne(type => UserEntity)
    @JoinColumn({
      name: 'user_id',
      referencedColumnName: 'id'
    })
    user: UserEntity;
  }
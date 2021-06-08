import { Entity, BaseEntity, Generated, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('access_token', {
    schema: 'security'
  })
  class AccessTokenEntity extends BaseEntity {
  
    @Generated('increment')
    @PrimaryColumn({
      type: 'bigint',
      transformer: {
        to: (entityValue: number) => entityValue,
        from: (databaseValue: string): number => parseInt(databaseValue, 10),
      },
    })
    id: number;
  
    @Column('character varying', {
      name: 'token',
      nullable: false
    })
    token: string;
  
    @Column('int', {
      nullable: true,
      select: false
    })
    expires: number;
  
    @ManyToOne(() => UserEntity, user => user.tokens)
    @JoinColumn({
      name: 'user_id',
      referencedColumnName: 'id'
    })
    user: UserEntity;
  
  }
  
  export { AccessTokenEntity };
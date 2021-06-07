import { BaseEntity, Column, Entity, Generated, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { CommentEntity } from '../../car/entities/comment.entity';
import { LikeEntity } from '../../car/entities/like.entity';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity('user', {
  schema: 'security',
})
export class UserEntity extends BaseEntity {
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
    nullable: true,
    length: 128,
  })
  image?: string;

  @Column('character varying', {
    nullable: false,
    length: 128,
  })
  name: string;

  @Column('character varying', {
    nullable: false,
    length: 128,
  })
  surname: string;

  @Column('character varying', {
    nullable: true,
    length: 128,
  })
  secondname?: string;

  @Column('character varying', {
    nullable: false,
    length: 128,
  })
  email: string;

  @Column('character varying', {
    nullable: true,
    length: 128,
  })
  phone?: string;

  @Column('character varying', {
    nullable: false,
    select: false,
  })
  password: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @ManyToMany(() => LikeEntity, (like) => like.users)
  likes: LikeEntity
}

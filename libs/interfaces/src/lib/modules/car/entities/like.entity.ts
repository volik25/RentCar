import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../security/entities/user.entity';
import { CommentEntity } from './comment.entity';

@Entity('like', {
  schema: 'car',
})
export class LikeEntity {
  @Generated('increment')
  @PrimaryColumn({
    type: 'bigint',
    transformer: {
      to: (entityValue: number) => entityValue,
      from: (databaseValue: string): number => parseInt(databaseValue, 10),
    },
  })
  id: number;
  
  @Column('boolean', {
    nullable: false,
    default: false,
  })
  isLike: boolean;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({
    name: 'user_id'
  })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.likes)
  @JoinColumn({
    name: 'comment_id'
  })
  comment: CommentEntity;
}

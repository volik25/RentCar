import { Column, Entity, ManyToMany } from 'typeorm';
import { UserEntity } from '../../security/entities/user.entity';
import { CommentEntity } from './comment.entity';

@Entity('like', {
  schema: 'car',
})
export class LikeEntity {
  @Column('boolean', {
    nullable: false,
    default: false,
  })
  isLike: boolean;

  @ManyToMany(() => UserEntity, (user) => user.likes)
  users: UserEntity[];

  @ManyToMany(() => CommentEntity, (comment) => comment.likes)
  comments: CommentEntity[];
}

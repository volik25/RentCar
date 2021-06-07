import { GradeEnum } from '@rent/interfaces/enums/grade.enum';
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../../security/entities/user.entity';
import { CommentEntity } from './comment.entity';

@Entity('grade', {
  schema: 'car',
})
export class GradeEntity extends BaseEntity {
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
    nullable: false,
    length: 128,
  })
  text: string;

  @Column('character varying', {
    nullable: false,
  })
  gradeType: GradeEnum

  @ManyToOne(() => CommentEntity, (comment) => comment.grades)
  @JoinColumn({
      name: 'comment_id',
      referencedColumnName: 'id'
  })
  comment: CommentEntity;
}

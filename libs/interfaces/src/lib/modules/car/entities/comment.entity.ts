import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { UserEntity } from "../../security/entities/user.entity";
import { CarEntity } from "./car.entity";
import { GradeEntity } from "./grade.entity";
import { LikeEntity } from "./like.entity";

@Entity('comment', {
    schema: 'car'
})
export class CommentEntity {
    @Generated('increment')
    @PrimaryColumn({
        type: 'bigint',
        transformer: {
        to: (entityValue: number) => entityValue,
        from: (databaseValue: string): number => parseInt(databaseValue, 10)
        }
    })
    id: number;

    @Column('date', {
        nullable: true
    })
    createDate: string;
    text: string;
    rating: number;

    @ManyToOne(() => UserEntity, (User) => User.comments)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: UserEntity;

    @ManyToOne(() => CarEntity, (Car) => Car.comments)
    @JoinColumn({
        name: 'car_id',
        referencedColumnName: 'id',
    })
    car: CarEntity;

    @OneToMany(() => LikeEntity, (Like) => Like.comment)
    likes: LikeEntity[];

    @OneToMany(() => GradeEntity, (grade) => grade.comment)
    grades: GradeEntity[];
}
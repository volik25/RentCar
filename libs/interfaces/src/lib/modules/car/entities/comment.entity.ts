import { Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";
import { CarEntity } from "./car.entity";

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
    createDate?: string;
    pluses: string[];
    minuses: string[];
    comment: string;
    rating: number;
    likes?: number;
    disLikes?: number;
    isLike?: number;

    user;

    @OneToMany(() => CarEntity, Car => Car.id)
    car: CarEntity;
}
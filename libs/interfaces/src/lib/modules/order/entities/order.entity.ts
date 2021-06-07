import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { OrderStatusEnum } from '@rent/interfaces/enums/order.status.enum';
import { BaseEntity, Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CarEntity } from '../../car/entities/car.entity';
import { UserEntity } from '../../security/entities/user.entity';
import { PlaceEntity } from './place.entity';

@Entity('order', {
    schema: 'car'
  })
export class OrderEntity extends BaseEntity {

    @Generated('increment')
    @PrimaryColumn({
        type: 'bigint',
        transformer: {
        to: (entityValue: number) => entityValue,
        from: (databaseValue: string): number => parseInt(databaseValue, 10)
        }
    })
    id: number;

    @Column('string', {
        nullable: false
      })
    status: OrderStatusEnum;

    @Column('string', {
        nullable: false
      })
    statusText: string;

    @Column('string', {
        nullable: false
      })
    statusClass: string;

    @Column('number', {
        nullable: false
      })
    orderSum: number;

    @Column('string', {
        nullable: false
      })
    dateFrom: NgbDate | string;

    @Column('string', {
        nullable: false
      })
    dateTo: NgbDate | string;

    @Column('string', {
        nullable: false
      })
    time: NgbTimeStruct | string;

    @ManyToOne(() => CarEntity, Car => Car.orders)
    @JoinColumn({
      name: 'car_id'
    })
    car: CarEntity;

    @ManyToOne(() => UserEntity, User => User.orders)
    @JoinColumn({
      name: 'user_id'
    })
    user: UserEntity

    @ManyToOne(() => PlaceEntity, Place => Place.orders)
    @JoinColumn({
      name: 'place_id'
    })
    place: PlaceEntity
}
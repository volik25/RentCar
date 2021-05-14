import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { OrderStatus } from '../../../enums/order.status.enum'
import { BaseEntity, Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';
import { CarEntity } from '../../car/entities/car.entity';

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

    @Column('number', {
        nullable: false
      })
    carId: number;

    @Column('number', {
        nullable: false
      })
    userId: number;

    @Column('number', {
        nullable: false
      })
    placeId: number;

    @Column('string', {
        nullable: false
      })
    status: OrderStatus;

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

    @ManyToOne(() => CarEntity, Car => Car.id)
    car: CarEntity;
}
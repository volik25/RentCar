import { BodyTypes } from '../../../enums/bodyTypes.enum';
import { FuelType } from '../../../enums/fuelTypes.enum';
import { KPP } from '../../../enums/kpp.enum';
import { WheelDrive } from '../../../enums/wheelDrive.enum';
import { AC } from '../../../enums/ac.enum';
import { SteeringType } from '../../../enums/steeringType.enum';
import { OrderEntity } from '../../order/entities/order.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';

@Entity('car', {
  schema: 'car',
})
export class CarEntity extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({
    type: 'bigint',
    transformer: {
      to: (entityValue: number) => entityValue,
      from: (databaseValue: string): number => parseInt(databaseValue, 10),
    },
  })
  id: number;

  @Column('character', {
    nullable: false,
  })
  img: string;

  @Column('character', {
    nullable: false,
  })
  name: string;

  @Column('character', {
    nullable: false,
  })
  description: string;

  @Column('int', {
    nullable: false,
  })
  price: number;

  @Column('character', {
    nullable: false,
  })
  bodyType: BodyTypes;

  @Column('character', {
    nullable: false,
  })
  fuelType: FuelType;

  @Column('int', {
    nullable: false,
  })
  fuelCity: number;

  @Column('int', {
    nullable: false,
  })
  fuelTrack: number;

  @Column('int', {
    nullable: false,
  })
  enginePower: number;

  @Column('int', {
    nullable: true,
    default: null,
  })
  engineVolume: number;

  @Column('int', {
    nullable: true,
    default: null,
  })
  maxSpeed: number;

  @Column('int', {
    nullable: true,
    default: null,
  })
  accelerationTime: number;

  @Column('character', {
    nullable: false,
  })
  kpp: KPP;

  @Column('int', {
    nullable: false,
  })
  gears: number;

  @Column('character', {
    nullable: false,
  })
  wheelDrive: WheelDrive;

  @Column('int', {
    nullable: false,
  })
  doors: number;

  @Column('int', {
    nullable: false,
  })
  sits: number;

  @Column('int', {
    nullable: true,
    default: null,
  })
  airbags: number;

  @Column('character', {
    nullable: false,
  })
  AC: AC;

  @Column('character', {
    nullable: false,
  })
  steering: SteeringType;

  @Column('int', {
    nullable: false,
  })
  trunkVolume: number;

  @Column('int', {
    nullable: true,
    default: null,
  })
  createYear: number;

  @Column('int', {
    nullable: true,
    default: null,
  })
  rating: number;

  @OneToMany(() => OrderEntity, (Order) => Order.car)
  orders: OrderEntity[];

  @OneToMany(() => CommentEntity, (Comment) => Comment.car)
  comments: CommentEntity[];
}

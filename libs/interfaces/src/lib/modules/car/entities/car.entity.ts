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

  @Column('string', {
    nullable: false,
  })
  img: string;

  @Column('string', {
    nullable: false,
  })
  name: string;

  @Column('string', {
    nullable: false,
  })
  description: string;

  @Column('number', {
    nullable: false,
  })
  price: number;

  @Column('string', {
    nullable: false,
  })
  bodyType: BodyTypes;

  @Column('string', {
    nullable: false,
  })
  fuelType: FuelType;

  @Column('number', {
    nullable: false,
  })
  fuelCity: number;

  @Column('number', {
    nullable: false,
  })
  fuelTrack: number;

  @Column('number', {
    nullable: false,
  })
  enginePower: number;

  @Column('number', {
    nullable: true,
    default: null,
  })
  engineVolume: number;

  @Column('number', {
    nullable: true,
    default: null,
  })
  maxSpeed: number;

  @Column('number', {
    nullable: true,
    default: null,
  })
  accelerationTime: number;

  @Column('string', {
    nullable: false,
  })
  kpp: KPP;

  @Column('number', {
    nullable: false,
  })
  gears: number;

  @Column('string', {
    nullable: false,
  })
  wheelDrive: WheelDrive;

  @Column('number', {
    nullable: false,
  })
  doors: number;

  @Column('number', {
    nullable: false,
  })
  sits: number;

  @Column('number', {
    nullable: true,
    default: null,
  })
  airbags: number;

  @Column('string', {
    nullable: false,
  })
  AC: AC;

  @Column('string', {
    nullable: false,
  })
  steering: SteeringType;

  @Column('number', {
    nullable: false,
  })
  trunkVolume: number;

  @Column('number', {
    nullable: true,
    default: null,
  })
  createYear: number;

  @Column('number', {
    nullable: true,
    default: null,
  })
  rating: number;

  @OneToMany(() => OrderEntity, (Order) => Order.car)
  orders: OrderEntity[];

  @OneToMany(() => CommentEntity, (Comment) => Comment.car)
  comments: CommentEntity[];
}

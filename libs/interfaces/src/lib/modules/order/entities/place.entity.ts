import { BaseEntity, Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
@Entity('place', {
  schema: 'order',
})
export class PlaceEntity extends BaseEntity {
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
  address: string;

  @OneToMany(() => OrderEntity, (order) => order.place)
  orders: OrderEntity[];
}

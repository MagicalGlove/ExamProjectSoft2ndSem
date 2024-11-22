import { OrderStatusEnum } from './types/orderStatusEnum.ts';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { OrderItem } from './types/order.ts';
import { Address } from '../RestaurantService/Restaurant.ts';
import { User } from '../loginService/User.ts';

@Entity('orders')
export class Order {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    customerID!: ObjectId | User;

    @Column()
    restaurantID!: ObjectId;

    @Column({ nullable: true })
    employeeID?: ObjectId;

    @Column({
        type: 'enum',
        enum: OrderStatusEnum,
        default: OrderStatusEnum.Created,
    })
    status!: OrderStatusEnum;

    @Column()
    address!: ObjectId | Address;

    @Column()
    totalPrice!: number;

    @Column('array')
    orderItemList!: OrderItem[];

    @Column({ nullable: true })
    feedbackID?: ObjectId;

    @Column()
    timestamp!: Date;
}

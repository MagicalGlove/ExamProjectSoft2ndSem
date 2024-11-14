import { OrderStatusEnum } from './types/orderStatusEnum.ts';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from "mongodb";

@Entity('orders')
export class Order {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    customerID!: ObjectId;

    @Column()
    restaurantID!: ObjectId;

    @Column({ nullable: true })
    employeeID?: ObjectId;

    @Column({ type: 'enum', enum: OrderStatusEnum, default: OrderStatusEnum.Created })
    status!: OrderStatusEnum;

    @Column()
    address!: ObjectId;

    @Column()
    totalPrice!: number;

    @Column("array")
    menuItemIDList!: ObjectId[];

    @Column({ nullable: true })
    feedbackID?: ObjectId;

    @Column()
    timestamp!: Date;
}

import { OrderStatusEnum } from './OrderStatusEnum.ts';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from "mongodb"; // Ensure proper import of Mongo ObjectId

@Entity()
export class Order{
    @ObjectIdColumn()
    orderID!: ObjectId

    @Column()
    customerID!: ObjectId

    @Column()
    restaurantID!: ObjectId

    @Column()
    employeeID!: ObjectId

    @Column()
    status!: OrderStatusEnum

    @Column()
    address!: ObjectId

    @Column()
    totalPrice!: number

    @Column()
    menuItemIDList!: ObjectId[]
}
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from "mongodb";

@Entity()
export class Feedback{
    @ObjectIdColumn()
    _id!: ObjectId

    @Column()
    foodRating!: number

    @Column()
    overallRating!: number

    @Column()
    deliveryRating!: number
}
import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('menuItems')
export class MenuItem {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    name!: string;

    @Column()
    price!: number;

    @Column()
    availability!: boolean;
}

@Entity('restaurants')
export class Restaurant {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    name!: string;

    @Column()
    address!: ObjectId;

    @Column()
    menu!: ObjectId[];
}

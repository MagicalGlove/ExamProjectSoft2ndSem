import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';
import { USER_ROLES } from './types/users.ts';
import { ObjectId as MongoObjectId } from 'mongodb';

@Entity('users')
export class User {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    role!: USER_ROLES;

    @Column()
    address?: MongoObjectId | Address;

    @Column()
    restaurant?: MongoObjectId;

    @Column()
    phoneNumber?: number;
}

@Entity('addresses')
export class Address {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    street!: string;

    @Column()
    city!: string;

    @Column()
    postalCode!: string;
}

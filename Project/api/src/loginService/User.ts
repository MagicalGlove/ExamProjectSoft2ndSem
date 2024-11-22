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
    address?: MongoObjectId;

    @Column()
    restaurant?: MongoObjectId;

    @Column()
    phoneNumber?: number;
}

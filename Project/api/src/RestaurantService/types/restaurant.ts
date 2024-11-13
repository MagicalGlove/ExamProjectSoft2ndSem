import { ObjectId } from 'mongodb';

export interface RestaurantI {
    _id: ObjectId;
    name: string;
    address: ObjectId;
    menuItems: ObjectId[];
}

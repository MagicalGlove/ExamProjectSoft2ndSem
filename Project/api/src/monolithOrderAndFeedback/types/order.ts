import { ObjectId } from 'mongodb';

export interface OrderData {
    customerID: ObjectId;
    restaurantID: ObjectId;
    address: ObjectId;
    totalPrice: number;
    orderItemList: OrderItem[];
    timestamp: Date;
    // status: string;
}

export interface OrderItem {
    menuItemId: ObjectId;
    quantity: number;
}

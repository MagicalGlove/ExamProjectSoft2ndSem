import { Order } from './Order.ts';
import { ObjectId } from 'mongodb';
import { AddOrder } from './OrderAndFeedbackRepository.ts';
import { OrderItem } from './types/order.ts';

export class OrderFactory {
    public async CreateOrder(
        customerID: ObjectId,
        restaurantID: ObjectId,
        address: ObjectId,
        totalPrice: number,
        orderItemList: OrderItem[],
        timestamp: Date
    ): Promise<Order | null> {
        const order = {
            customerID,
            restaurantID,
            address,
            totalPrice,
            orderItemList,
            timestamp,
        };

        return await AddOrder(order);
    }
}

import { Order } from './Order.ts';
import { ObjectId } from 'mongodb';
import { AddOrder } from './OrderAndFeedbackRepository.ts';

export class OrderFactory {
    public async CreateOrder(
        customerID: ObjectId,
        restaurantID: ObjectId,
        items: ObjectId[],
        address: ObjectId
    ): Promise<Order | null> {
        const order = new Order();

        order.customerID = customerID;
        order.restaurantID = restaurantID;
        order.menuItemIDList = items;
        order.address = address;

        return await AddOrder(order);
    }
}

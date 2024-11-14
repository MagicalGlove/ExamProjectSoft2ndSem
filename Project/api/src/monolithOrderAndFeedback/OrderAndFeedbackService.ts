import { Order } from './Order.ts';
import { OrderFactory } from './OrderFactory.ts';
import { ObjectId } from 'mongodb';

async function createOrder(
    customerID: ObjectId,
    restaurantID: ObjectId,
    items: ObjectId[],
    address: ObjectId
): Promise<Order | null> {
    const orderFactory: OrderFactory = new OrderFactory();

    const order = await orderFactory.CreateOrder(
        customerID,
        restaurantID,
        items,
        address
    );

    return order;
}

export { createOrder };

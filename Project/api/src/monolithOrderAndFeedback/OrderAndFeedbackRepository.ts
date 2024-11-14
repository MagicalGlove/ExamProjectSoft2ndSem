import { AppDataSource } from '../ormconfig.ts';
import { Order } from './Order.ts';

const orderRepository = AppDataSource.getMongoRepository(Order);

async function AddOrder(order: Order): Promise<Order | null> {
    if (!order) return null;

    return orderRepository.create(order);
}

export { AddOrder };

import { ObjectId } from 'mongodb';
import { User } from '../loginService/User.ts';
import { AppDataSource } from '../ormconfig.ts';
import { Address, MenuItem } from '../RestaurantService/Restaurant.ts';
import { Feedback } from './Feedback.ts';
import { Order } from './Order.ts';
import { FeedbackData } from './types/feedback.ts';
import { OrderData } from './types/order.ts';

const orderRepository = AppDataSource.getMongoRepository(Order);
const menuItemRepository = AppDataSource.getMongoRepository(MenuItem);
const feedbackRepository = AppDataSource.getMongoRepository(Feedback);
const addressRepository = AppDataSource.getMongoRepository(Address);
const userRepository = AppDataSource.getMongoRepository(User);

async function AddOrder(order: OrderData): Promise<Order | null> {
    if (!order) return null;

    const orderPersist = orderRepository.create(order);

    return orderRepository.save(orderPersist);
}

async function getAddress(object: Order) {
    const address = await addressRepository.findOne({
        where: {
            _id: object.address,
        },
    });

    return address;
}

async function getCustomer(object: Order) {
    const customer = await userRepository.findOne({
        where: {
            _id: object.customerID,
        },
    });

    return customer;
}

async function getMenuItems(orders: Order[]) {
    const menuItemIds = orders.flatMap((order) =>
        order.orderItemList.map((item) => item.menuItemId)
    );

    const menuItems = await menuItemRepository.find({
        where: {
            _id: { $in: menuItemIds.map((id) => id) },
        },
    });

    const menuItemMap = new Map(
        menuItems.map((item) => [item._id.toHexString(), item])
    );

    for (const order of orders) {
        order.orderItemList = order.orderItemList.map((item) => ({
            ...item,
            menuItem: menuItemMap.get(item.menuItemId.toHexString()),
        }));
    }

    return orders;
}

async function GetAllOrdersById(restaurantID: string): Promise<Order[] | null> {
    try {
        const restaurantObjectID = new ObjectId(restaurantID);
        const orders = await orderRepository.find({
            where: { restaurantID: restaurantObjectID },
        });

        const ordersList: Order[] = [];

        const orderWithMenuItems = await getMenuItems(orders);

        for (const order of orderWithMenuItems) {
            const address = await getAddress(order);
            const customer = await getCustomer(order);

            const ordersTemp: Order = {
                ...order,
                address: address || order.address,
                customerID: customer || order.customerID,
            };

            ordersList.push(ordersTemp);
        }

        return ordersList;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

async function GetAllOrders(): Promise<Order[] | null> {
    try {
        const orders = await orderRepository.find();

        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

async function GetAllAcceptedOrders(): Promise<Order[] | null> {
    try {
        const acceptedOrders = await orderRepository.find({
            where: { status: 2 },
        });

        const acceptedOrderList: Order[] = [];

        for (const acceptedOrder of acceptedOrders) {
            const address = await getAddress(acceptedOrder);

            const acceptedOrderTemp = {
                ...acceptedOrder,
                address: address || acceptedOrder.address,
            };

            acceptedOrderList.push(acceptedOrderTemp);
        }

        return acceptedOrderList;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

async function createFeedbackAndLinkOrder({
    foodRating,
    overallRating,
    deliveryRating,
    orderId,
}: FeedbackData) {
    return await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {
            const feedback = transactionalEntityManager.create(Feedback, {
                foodRating,
                overallRating,
                deliveryRating,
            });

            await transactionalEntityManager.save(feedback);

            await transactionalEntityManager.update(
                Order,
                { _id: orderId },
                { feedbackID: feedback._id }
            );

            return feedback;
        }
    );
}

export {
    AddOrder,
    GetAllAcceptedOrders,
    createFeedbackAndLinkOrder,
    feedbackRepository,
    orderRepository,
    GetAllOrders,
    GetAllOrdersById,
};

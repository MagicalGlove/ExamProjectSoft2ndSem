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

async function acceptRejectOrder(
    orderId: string,
    newStatus: number,
    rejectReason: string
) {
    if (newStatus < 0 || newStatus > 4) {
        throw new Error('Status must be between inclusive 0 and 4, inclusive');
    } else if (newStatus !== 1 && rejectReason) {
        throw new Error(
            'There can only be a reason for rejecting, if status is set to 1, aka reject'
        );
    }

    const orderObjectId = new ObjectId(orderId);
    const order = await orderRepository.findOne({
        where: { _id: orderObjectId },
    });

    if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
    }

    const orderTemp: Order = {
        ...order,
        status: newStatus,
        rejectReason: rejectReason || null,
    };

    const updatedOrder = await orderRepository.save(orderTemp);

    return updatedOrder;
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

        const ordersWithMenuItems = await getMenuItems(acceptedOrders);

        for (const acceptedOrder of ordersWithMenuItems) {
            const address = await getAddress(acceptedOrder);
            const customer = await getCustomer(acceptedOrder);

            const acceptedOrderTemp = {
                ...acceptedOrder,
                address: address || acceptedOrder.address,
                customerID: customer || acceptedOrder.customerID,
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
            const orderIdOjectID = new ObjectId(orderId);

            const order = await transactionalEntityManager.findOne(Order, {
                where: { _id: orderIdOjectID },
            });

            if (!order) {
                throw new Error(`Order with id ${orderId} not found`);
            }

            const feedback = transactionalEntityManager.create(Feedback, {
                foodRating,
                overallRating,
                deliveryRating,
            });

            await transactionalEntityManager.save(feedback);

            const updateResult = await transactionalEntityManager.update(
                Order,
                { _id: orderIdOjectID },
                { feedbackID: feedback._id }
            );

            if (updateResult.affected === 0) {
                throw new Error('Failed to update order with feedback ID');
            }

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
    acceptRejectOrder,
};

import { ObjectId } from 'mongodb';
import { User } from '../loginService/User.ts';
import { AppDataSource } from '../ormconfig.ts';
import { Address, MenuItem } from '../RestaurantService/Restaurant.ts';
import { Feedback } from './Feedback.ts';
import { Order } from './Order.ts';
import { FeedbackData } from './types/feedback.ts';
import { OrderData } from './types/order.ts';
import { calculateDeliveryPay } from '../utilities/order.ts';

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
    const menuItemIds = orders.flatMap((order) => order.orderItemList.map((item) => item.menuItemId));

    const menuItems = await menuItemRepository.find({
        where: {
            _id: { $in: menuItemIds.map((id) => id) },
        },
    });

    const menuItemMap = new Map(menuItems.map((item) => [item._id.toHexString(), item]));

    for (const order of orders) {
        order.orderItemList = order.orderItemList.map((item) => ({
            ...item,
            menuItem: menuItemMap.get(item.menuItemId.toHexString()),
        }));
    }

    return orders;
}

async function acceptRejectOrder(orderId: string, newStatus: number, rejectReason?: string) {
    if (newStatus < 0 || newStatus > 4) {
        throw new Error('Status must be between between 0 and 4, inclusive');
    } else if (newStatus !== 1 && rejectReason) {
        throw new Error('There can only be a reason for rejecting, if status is set to 1, aka reject');
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
    const orders = await orderRepository.find();

    return orders;
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
        throw new Error('' + error);
    }
}
async function GetOwnOrders(employeeID: string, status: number): Promise<Order[] | null> {
    try {
        const employeeIDObjectID = new ObjectId(employeeID);

        const orders = await orderRepository.find({
            where: {
                employeeID: employeeIDObjectID,
                status: status,
            },
        });

        const ownOrderList: Order[] = [];

        const ordersWithMenuItems = await getMenuItems(orders);

        for (const ownOrder of ordersWithMenuItems) {
            const address = await getAddress(ownOrder);
            const customer = await getCustomer(ownOrder);

            const ownOrderTemp = {
                ...ownOrder,
                address: address || ownOrder.address,
                customerID: customer || ownOrder.customerID,
            };

            ownOrderList.push(ownOrderTemp);
        }

        return ownOrderList;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Error retrieving orders');
    }
}

async function createFeedbackAndLinkOrder({ foodRating, overallRating, deliveryRating, orderId }: FeedbackData) {
    return await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
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
    });
}

async function acceptOrderAsDelivery(orderID: string, employeeID: string) {
    const employeeIDObjectID = new ObjectId(employeeID);
    const orderObjectID = new ObjectId(orderID);
    const order = await orderRepository.findOne({
        where: { _id: orderObjectID },
    });

    if (!order) {
        throw new Error(`Order with ID ${orderID} not found`);
    }

    if (order?.status !== 2) throw new Error('Order is not at pick up stage');

    const orderTemp: Order = {
        ...order,
        employeeID: employeeIDObjectID,
        status: 3,
        pickUpDate: new Date(),
    };

    const updatedOrder = await orderRepository.save(orderTemp);

    return updatedOrder;
}

async function completeOrderAsDelivery(orderID: string) {
    const orderObjectID = new ObjectId(orderID);
    const order = await orderRepository.findOne({
        where: { _id: orderObjectID },
    });

    if (!order) {
        throw new Error(`Order with ID ${orderID} not found`);
    }

    if (order?.status !== 3) throw new Error('Order is not ready to be completed');

    const orderTemp: Order = {
        ...order,
        status: 4,
        completionDate: new Date(),
    };

    const updatedOrder = await orderRepository.save(orderTemp);

    return updatedOrder;
}

async function getRatingAVG(orderID: ObjectId) {
    const order = await orderRepository.findOne({
        where: { _id: orderID },
    });

    if (!order) {
        throw new Error(`Order with ID ${orderID} not found`);
    }

    const feedback = await feedbackRepository.findOne({
        where: {
            _id: new ObjectId(order?.feedbackID),
        },
    });

    if (!feedback) throw new Error(`Feedback with ID ${order?.feedbackID} not found`);

    if (!feedback?.deliveryRating || !feedback?.foodRating || !feedback?.overallRating)
        throw new Error('Feedback ratings are incomplete for feedback #' + feedback?._id);

    const avgRating = (feedback?.deliveryRating + feedback?.foodRating + feedback?.overallRating) / 3;

    return avgRating;
}

async function calculateAndUpdateOrderPay(orderID: string) {
    const orderObjectID = new ObjectId(orderID);

    const order = await orderRepository.findOne({
        where: { _id: orderObjectID },
    });

    const allOrders = await orderRepository.find({
        where: {
            employeeID: order?.employeeID,
        },
    });

    const totalOrdersAmount = allOrders.length;

    if (!order) {
        throw new Error(`Order with ID ${orderID} not found`);
    }

    const pay = {
        baseAmount: 0,
        totalOrderQuantityMultiplier: 0,
        deliverySpeedMultiplier: 0,
        feedbackRatingMultiplier: 0,
        orderPriceBonus: 0,
        nightTimeBonus: 0,
        totalPay: 0,
    };

    order.pay = pay;

    pay.baseAmount = 5; // Base pay

    pay.orderPriceBonus = order.totalPrice / 100; // Bonus depending on order price

    const multiplicationFactor = totalOrdersAmount / 1000 > 0.2 ? 0.2 : totalOrdersAmount / 1000;
    pay.totalOrderQuantityMultiplier = 1 + multiplicationFactor; // Bonus for total amount of orders done. Bonus slowly increases and maxes out at 25% bonus

    if (new Date(order.timestamp).getHours() >= 22 || new Date(order.timestamp).getHours() < 5) {
        pay.nightTimeBonus = 2.5; // Night bonus added if order is created between 10 pm and 5 am
    }

    if (order.pickUpDate && order.completionDate) {
        const deliveryTimeInMinutes = (Number(order.completionDate) - Number(order.pickUpDate)) / 1000 / 60;
        let multiplier = 1;

        if (deliveryTimeInMinutes <= 30) {
            multiplier = 1.2; // 20% bonus for fast delivery
        } else if (deliveryTimeInMinutes <= 45) {
            multiplier = 1.1; // 10% bonus for moderate delivery
        } else if (deliveryTimeInMinutes <= 60) {
            multiplier = 1.05; // 5% bonus for slower delivery
        }
        pay.deliverySpeedMultiplier = multiplier; // Bonuns for delivery time
    }

    const avgRating = await getRatingAVG(order._id);
    if (avgRating) pay.feedbackRatingMultiplier *= 1 + avgRating / 100; // Bonus for rating

    const orderTemp: Order = {
        ...order,
        pay: {
            baseAmount: pay.baseAmount,
            totalOrderQuantityMultiplier: pay.totalOrderQuantityMultiplier,
            deliverySpeedMultiplier: pay.deliverySpeedMultiplier,
            feedbackRatingMultiplier: pay.feedbackRatingMultiplier,
            orderPriceBonus: pay.orderPriceBonus,
            nightTimeBonus: pay.nightTimeBonus,
            totalPay: calculateDeliveryPay(order.pay),
        },
    };

    const updatedOrder = await orderRepository.save(orderTemp);

    return updatedOrder;
}

export {
    AddOrder,
    GetAllAcceptedOrders, // Delivery
    createFeedbackAndLinkOrder,
    feedbackRepository,
    orderRepository,
    GetAllOrders,
    GetAllOrdersById,
    acceptRejectOrder,
    acceptOrderAsDelivery, // Delivery
    GetOwnOrders, // Delivery
    completeOrderAsDelivery, // Delivery
    calculateAndUpdateOrderPay, // Delivery
    getRatingAVG,
};

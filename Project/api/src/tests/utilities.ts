import { ObjectId } from 'mongodb';
import * as orderAndFeedbackService from '../monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import { getAllOrdersMockOrder1, getAllOrdersMockOrder2 } from './mocks/orderMocksDB.ts';
import { Order } from '../monolithOrderAndFeedback/Order.ts';

export async function createOrders() {
    // Assign values from getAllOrdersMockOrder1
    const { customerID, restaurantID, orderItemList, address, totalPrice, timestamp } = getAllOrdersMockOrder1;

    const order = await orderAndFeedbackService.createOrder(
        customerID,
        restaurantID,
        orderItemList,
        address,
        totalPrice,
        timestamp
    );

    return {
        getOrder: () => order,
    };
}

export async function createOrders2() {
    // Assign values from getAllOrdersMockOrder1
    const { customerID, restaurantID, orderItemList, address, totalPrice, timestamp } = getAllOrdersMockOrder2;

    const order = await orderAndFeedbackService.createOrder(
        customerID,
        restaurantID,
        orderItemList,
        address,
        totalPrice,
        timestamp
    );

    return {
        getOrder2: () => order,
    };
}

export function setOrderHours(
    dummyOrder: Order,
    feedbackID: ObjectId | undefined,
    timestampHours: number[],
    pickUpDateHours: number[],
    completionDateHours: number[]
) {
    dummyOrder = {
        ...(dummyOrder as Order),
        status: 3,
        employeeID: new ObjectId('672df427f54107237ff75569'),
        feedbackID: feedbackID,
        timestamp: (() => {
            const time = new Date();
            time.setHours(timestampHours[0], timestampHours[1], timestampHours[2], timestampHours[3]); // Hours, minutes, secondss, miliseconds
            return time;
        })(),
        // Hours are set to count the time it took for the order to be delivered and thereby the bonus pay multiplier applied
        pickUpDate: (() => {
            const time = new Date();
            time.setHours(pickUpDateHours[0], pickUpDateHours[1], pickUpDateHours[2], pickUpDateHours[3]); // Hours, minutes, secondss, miliseconds
            return time;
        })(),
        completionDate: (() => {
            const time = new Date();
            time.setHours(
                completionDateHours[0],
                completionDateHours[1],
                completionDateHours[2],
                completionDateHours[3]
            ); // Hours, minutes, secondss, miliseconds -
            return time;
        })(),
    };

    return dummyOrder;
}

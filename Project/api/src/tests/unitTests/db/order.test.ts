import { AppDataSource } from '../../../ormconfig.ts';
import * as orderAndFeedbackService from '../../../monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import { ObjectId } from 'mongodb';

describe('Database Functionality for createFeedbackAndLinkOrder', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should create order', async () => {
        const mockOrder = {
            _id: new ObjectId('673de997fa60e0a917658708'),
            customerID: new ObjectId('672df427f54107237ff75565'),
            restaurantID: new ObjectId('672de88ff54107237ff75565'),
            address: new ObjectId('672df723f54107237ff75573'),
            totalPrice: 50,
            orderItemList: [
                {
                    menuItemId: new ObjectId('672de8c4f54107237ff75546'),
                    quantity: 2,
                },
                {
                    menuItemId: new ObjectId('672de8c4f54107237ff75547'),
                    quantity: 3,
                },
                {
                    menuItemId: new ObjectId('672de8c4f54107237ff75548'),
                    quantity: 1,
                },
            ],
            timestamp: new Date('2024-11-20T12:00:00.000Z'),
            employeeID: null,
            feedbackID: null,
        };

        const order = await orderAndFeedbackService.createOrder(
            mockOrder.customerID,
            mockOrder.restaurantID,
            mockOrder.address,
            mockOrder.totalPrice,
            mockOrder.orderItemList,
            mockOrder.timestamp
        );

        if (!order) {
            throw new Error(
                'Order creation failed, cannot proceed with feedback creation'
            );
        }

        const orderData = {
            _id: new ObjectId('673de997fa60e0a917658708'),
            customerID: new ObjectId('672df427f54107237ff75565'),
            restaurantID: new ObjectId('672de88ff54107237ff75565'),
            address: new ObjectId('672df723f54107237ff75573'),
            totalPrice: 50,
            orderItemList: [
                {
                    menuItemId: new ObjectId('672de8c4f54107237ff75546'),
                    quantity: 2,
                },
                {
                    menuItemId: new ObjectId('672de8c4f54107237ff75547'),
                    quantity: 3,
                },
                {
                    menuItemId: new ObjectId('672de8c4f54107237ff75548'),
                    quantity: 1,
                },
            ],
            timestamp: new Date('2024-11-20T12:00:00.000Z'),
            employeeID: null,
            feedbackID: null,
        };

        expect(order).not.toBeNull();
        expect(order.timestamp).toStrictEqual(orderData.timestamp);
        expect(order.totalPrice).toBe(orderData.totalPrice);
        expect(order.orderItemList).toStrictEqual(orderData.orderItemList);
    });
});

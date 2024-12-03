import { AppDataSource } from '../../../../ormconfig.ts';
import * as orderAndFeedbackRepository from '../../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import { ObjectId } from 'mongodb';
import { Order } from '../../../../monolithOrderAndFeedback/Order.ts';
import { createOrders, createOrders2, setOrderHours } from '../../../utilities.ts';
import { mockOrderWithId } from '../../../mocks/orderMocksDB.ts';

describe('calculate and complete order', () => {
    const orderRepository = AppDataSource.getMongoRepository(Order);

    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    let dummyOrder: Order | null;
    let getOrder: () => Order | null;

    beforeEach(async () => {
        ({ getOrder } = await createOrders());
        await createOrders2();
    });

    afterEach(async () => {
        const repository = AppDataSource.getRepository(Order);
        await repository.delete({}); //Deletes all documents in the collection
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should calculate and update correctly', async () => {
        dummyOrder = getOrder();

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        const feedbackData = {
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: dummyOrder._id,
        };

        const feedback = await orderAndFeedbackRepository.createFeedbackAndLinkOrder(feedbackData);

        dummyOrder = {
            ...(dummyOrder as Order),
            status: 3,
            employeeID: new ObjectId('672df427f54107237ff75569'),
            feedbackID: feedback._id,
        };

        const order = await orderRepository.save(dummyOrder);

        if (!order.employeeID) throw new Error('Order was not created!');

        const calculatedUpdatedOrder = await orderAndFeedbackRepository.calculateAndUpdateOrderPay(
            order?._id.toString()
        );

        expect(calculatedUpdatedOrder).not.toBeNull();

        // Match only the necessary properties
        expect(calculatedUpdatedOrder).toEqual(
            expect.objectContaining({
                _id: expect.any(Object), // If the ID is autogenerated
                pay: expect.objectContaining({ totalPay: expect.any(Number) }),
                customerID: dummyOrder.customerID,
                restaurantID: dummyOrder.restaurantID,
                address: dummyOrder.address,
                totalPrice: dummyOrder.totalPrice,
                orderItemList: dummyOrder.orderItemList,
                timestamp: dummyOrder.timestamp,
                employeeID: dummyOrder.employeeID,
                status: 3,
            })
        );
    });

    it('should calculate and update with night bonus and speed bonus', async () => {
        dummyOrder = getOrder();

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        const feedbackData = {
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: dummyOrder._id,
        };

        const feedback = await orderAndFeedbackRepository.createFeedbackAndLinkOrder(feedbackData);

        dummyOrder = setOrderHours(dummyOrder, feedback._id, [23, 30, 0, 0], [23, 35, 0, 0], [23, 45, 0, 0]);

        const order = await orderRepository.save(dummyOrder);

        if (!order.employeeID) throw new Error('Order was not created!');

        const calculatedUpdatedOrder = await orderAndFeedbackRepository.calculateAndUpdateOrderPay(
            order?._id.toString()
        );

        expect(calculatedUpdatedOrder).not.toBeNull();

        // Match only the necessary properties
        expect(calculatedUpdatedOrder).toEqual(
            expect.objectContaining({
                _id: dummyOrder._id, // Adjusted for string ID
                customerID: dummyOrder.customerID,
                restaurantID: dummyOrder.restaurantID,
                address: dummyOrder.address,
                totalPrice: dummyOrder.totalPrice,
                orderItemList: dummyOrder.orderItemList,
                timestamp: dummyOrder.timestamp,
                pickUpDate: dummyOrder.pickUpDate, // Fixed field name
                completionDate: dummyOrder.completionDate, // Added field
                feedbackID: feedback._id, // Added field
                employeeID: dummyOrder.employeeID,
                status: 3,
            })
        );
    });

    it('should calculate and update with moderate delivery time bonus and max TOQmultiplier', async () => {
        dummyOrder = getOrder();

        const mockOrders = Array.from({ length: 201 }, () => mockOrderWithId);

        jest.spyOn(orderRepository, 'find').mockResolvedValue(mockOrders);

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        const feedbackData = {
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: dummyOrder._id,
        };

        const feedback = await orderAndFeedbackRepository.createFeedbackAndLinkOrder(feedbackData);
        dummyOrder = setOrderHours(dummyOrder, feedback._id, [19, 30, 0, 0], [20, 5, 0, 0], [20, 45, 0, 0]);

        const order = await orderRepository.save(dummyOrder);

        if (!order.employeeID) throw new Error('Order was not created!');

        const calculatedUpdatedOrder = await orderAndFeedbackRepository.calculateAndUpdateOrderPay(
            order?._id.toString()
        );

        jest.restoreAllMocks();

        expect(calculatedUpdatedOrder).not.toBeNull();

        // Match only the necessary properties
        expect(calculatedUpdatedOrder).toEqual(
            expect.objectContaining({
                _id: dummyOrder._id, // Adjusted for string ID
                customerID: dummyOrder.customerID,
                restaurantID: dummyOrder.restaurantID,
                address: dummyOrder.address,
                totalPrice: dummyOrder.totalPrice,
                orderItemList: dummyOrder.orderItemList,
                timestamp: dummyOrder.timestamp,
                pickUpDate: dummyOrder.pickUpDate, // Fixed field name
                completionDate: dummyOrder.completionDate, // Added field
                feedbackID: feedback._id, // Added field
                employeeID: dummyOrder.employeeID,
                status: 3,
            })
        );
    });

    it('should calculate and update with slow delivery time bonus', async () => {
        dummyOrder = getOrder();

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        const feedbackData = {
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: dummyOrder._id,
        };

        const feedback = await orderAndFeedbackRepository.createFeedbackAndLinkOrder(feedbackData);
        dummyOrder = setOrderHours(dummyOrder, feedback._id, [19, 30, 0, 0], [20, 5, 0, 0], [20, 55, 0, 0]);

        const order = await orderRepository.save(dummyOrder);

        if (!order.employeeID) throw new Error('Order was not created!');

        const calculatedUpdatedOrder = await orderAndFeedbackRepository.calculateAndUpdateOrderPay(
            order?._id.toString()
        );

        expect(calculatedUpdatedOrder).not.toBeNull();

        // Match only the necessary properties
        expect(calculatedUpdatedOrder).toEqual(
            expect.objectContaining({
                _id: dummyOrder._id, // Adjusted for string ID
                customerID: dummyOrder.customerID,
                restaurantID: dummyOrder.restaurantID,
                address: dummyOrder.address,
                totalPrice: dummyOrder.totalPrice,
                orderItemList: dummyOrder.orderItemList,
                timestamp: dummyOrder.timestamp,
                pickUpDate: dummyOrder.pickUpDate, // Fixed field name
                completionDate: dummyOrder.completionDate, // Added field
                feedbackID: feedback._id, // Added field
                employeeID: dummyOrder.employeeID,
                status: 3,
            })
        );
    });

    it('should fail to find order', async () => {
        dummyOrder = getOrder();

        jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        await expect(orderAndFeedbackRepository.calculateAndUpdateOrderPay(dummyOrder?._id.toString())).rejects.toThrow(
            `Order with ID ${dummyOrder?._id.toString()} not found`
        );

        jest.restoreAllMocks();
    });
});

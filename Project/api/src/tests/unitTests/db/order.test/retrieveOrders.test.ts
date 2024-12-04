import { AppDataSource } from '../../../../ormconfig.ts';
import * as orderAndFeedbackService from '../../../../monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import * as orderAndFeedbackRepository from '../../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import { ObjectId } from 'mongodb';
import { Order } from '../../../../monolithOrderAndFeedback/Order.ts';
import { createOrders, createOrders2 } from '../../../utilities.ts';
import { getAllOrdersMockOrder1 } from '../../../mocks/orderMocksDB.ts';

describe('Retrieve orders functions', () => {
    const orderRepository = AppDataSource.getMongoRepository(Order);

    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    let dummyOrder1: Order | null;
    let dummyOrder2: Order | null;
    let getOrder: () => Order | null;
    let getOrder2: () => Order | null;

    beforeEach(async () => {
        ({ getOrder } = await createOrders());
        ({ getOrder2 } = await createOrders2());

        dummyOrder1 = await getOrder();
        dummyOrder2 = await getOrder2();

        dummyOrder1 = {
            ...(dummyOrder1 as Order),
            status: 2,
            employeeID: new ObjectId('672df427f54107237ff75569'),
        };

        dummyOrder2 = {
            ...(dummyOrder2 as Order),
            status: 2,
            employeeID: new ObjectId('672df427f54107237ff75569'),
        };

        await orderRepository.save(dummyOrder1);
        await orderRepository.save(dummyOrder2);
    });

    afterEach(async () => {
        const repository = AppDataSource.getRepository(Order);
        await repository.delete({}); //Deletes all documents in the collection
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should get all accepted orders', async () => {
        if (!dummyOrder1 || !dummyOrder2) throw new Error('An order was not created properly!');

        const orders = await orderAndFeedbackService.getAllAcceptedOrders();

        expect(orders).not.toBeNull();

        expect(orders).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(Object), // If the ID is autogenerated
                    customerID: dummyOrder1.customerID,
                    restaurantID: dummyOrder1.restaurantID,
                    address: dummyOrder1.address,
                    totalPrice: dummyOrder1.totalPrice,
                    orderItemList: dummyOrder1.orderItemList,
                    timestamp: dummyOrder1.timestamp,
                }),
                expect.objectContaining({
                    _id: expect.any(Object),
                    customerID: dummyOrder2.customerID,
                    restaurantID: dummyOrder2.restaurantID,
                    address: dummyOrder2.address,
                    totalPrice: dummyOrder2.totalPrice,
                    orderItemList: dummyOrder2.orderItemList,
                    timestamp: dummyOrder2.timestamp,
                }),
            ])
        );
    });

    it('should throw error', async () => {
        jest.spyOn(orderRepository, 'find').mockRejectedValue(new Error('Database error'));

        await expect(orderAndFeedbackRepository.GetAllAcceptedOrders()).rejects.toThrow('Error: Database error');

        jest.restoreAllMocks();
    });

    it('should get all own orders', async () => {
        if (!dummyOrder1 || !dummyOrder2) throw new Error('An order was not created properly!');
        if (!dummyOrder1.employeeID) throw new Error('Order has no employeeID!');

        const orders = await orderAndFeedbackRepository.GetOwnOrders(dummyOrder1.employeeID?.toString(), 2);

        expect(orders).not.toBeNull();

        expect(orders).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(Object), // If the ID is autogenerated
                    customerID: dummyOrder1.customerID,
                    restaurantID: dummyOrder1.restaurantID,
                    address: dummyOrder1.address,
                    totalPrice: dummyOrder1.totalPrice,
                    orderItemList: dummyOrder1.orderItemList,
                    timestamp: dummyOrder1.timestamp,
                }),
                expect.objectContaining({
                    _id: expect.any(Object),
                    customerID: dummyOrder2.customerID,
                    restaurantID: dummyOrder2.restaurantID,
                    address: dummyOrder2.address,
                    totalPrice: dummyOrder2.totalPrice,
                    orderItemList: dummyOrder2.orderItemList,
                    timestamp: dummyOrder2.timestamp,
                }),
            ])
        );
    });

    it('should fail to get all own orders because of wrong ID', async () => {
        if (!dummyOrder1 || !dummyOrder2) throw new Error('An order was not created properly!');
        if (!dummyOrder1.employeeID) throw new Error('Order has no employeeID!');

        await expect(orderAndFeedbackRepository.GetOwnOrders('wrongID', 2)).rejects.toThrow('Error retrieving orders');
    });

    it('should get all orders basesd on restaurant id', async () => {
        if (!dummyOrder1 || !dummyOrder2) throw new Error('An order was not created properly!');
        if (!dummyOrder1.employeeID) throw new Error('Order has no employeeID!');

        const orders = await orderAndFeedbackRepository.GetAllOrdersById(
            getAllOrdersMockOrder1.restaurantID.toString()
        );

        expect(orders).not.toBeNull();

        expect(orders).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(Object), // If the ID is autogenerated
                    customerID: dummyOrder1.customerID,
                    restaurantID: dummyOrder1.restaurantID,
                    address: dummyOrder1.address,
                    totalPrice: dummyOrder1.totalPrice,
                    orderItemList: dummyOrder1.orderItemList,
                    timestamp: dummyOrder1.timestamp,
                }),
                expect.objectContaining({
                    _id: expect.any(Object),
                    customerID: dummyOrder2.customerID,
                    restaurantID: dummyOrder2.restaurantID,
                    address: dummyOrder2.address,
                    totalPrice: dummyOrder2.totalPrice,
                    orderItemList: dummyOrder2.orderItemList,
                    timestamp: dummyOrder2.timestamp,
                }),
            ])
        );
    });

    it('should fail to get orders by restaurant id', async () => {
        if (!dummyOrder1 || !dummyOrder2) throw new Error('An order was not created properly!');
        if (!dummyOrder1.employeeID) throw new Error('Order has no employeeID!');

        const orders = await orderAndFeedbackRepository.GetAllOrdersById('wrongID');

        expect(orders).toBeNull();
    });
});

import { AppDataSource } from '../../../../ormconfig.ts';
import * as orderAndFeedbackRepository from '../../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import { ObjectId } from 'mongodb';
import { Order } from '../../../../monolithOrderAndFeedback/Order.ts';
import { Feedback } from '../../../../monolithOrderAndFeedback/Feedback.ts';
import { createOrders, createOrders2 } from '../../../utilities.ts';

describe('get average rating', () => {
    const feedbackRepository = AppDataSource.getMongoRepository(Feedback);
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

    it('should succeed getting average rating', async () => {
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

        const avgRating = await orderAndFeedbackRepository.getRatingAVG(new ObjectId(order?._id.toString()));

        expect(avgRating).not.toBeNull();
        expect(avgRating).toEqual(4);
    });

    it('should fail to find order', async () => {
        dummyOrder = getOrder();

        jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        const wrongID = '672df427f54107237ff75569';

        await expect(orderAndFeedbackRepository.getRatingAVG(new ObjectId(wrongID))).rejects.toThrow(
            `Order with ID ${wrongID} not found`
        );

        jest.restoreAllMocks();
    });

    it('should fail to find feedback connected to order', async () => {
        dummyOrder = getOrder();

        dummyOrder = {
            ...(dummyOrder as Order),
            feedbackID: new ObjectId('672df427f54107237ff75569'),
        };
        await orderRepository.save(dummyOrder);

        jest.spyOn(feedbackRepository, 'findOne').mockResolvedValue(null);

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        await expect(orderAndFeedbackRepository.getRatingAVG(new ObjectId(dummyOrder?._id))).rejects.toThrow(
            `Feedback with ID ${dummyOrder?.feedbackID} not found`
        );

        jest.restoreAllMocks();
    });

    it('should fail because of no overall rating', async () => {
        dummyOrder = getOrder();

        dummyOrder = {
            ...(dummyOrder as Order),
            feedbackID: new ObjectId('672df427f54107237ff75569'),
        };
        await orderRepository.save(dummyOrder);

        jest.spyOn(feedbackRepository, 'findOne').mockResolvedValue({
            _id: new ObjectId('672df427f54107237ff75569'),
            foodRating: 5,
            deliveryRating: 3,
            overallRating: null as unknown as number,
        });

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        await expect(orderAndFeedbackRepository.getRatingAVG(new ObjectId(dummyOrder?._id))).rejects.toThrow(
            `Feedback ratings are incomplete for feedback #${dummyOrder?.feedbackID}`
        );

        jest.restoreAllMocks();
    });
});

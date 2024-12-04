import { AppDataSource } from '../../../ormconfig.ts';
import * as orderAndFeedbackRepository from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import {
    createFeedbackAndLinkOrder,
    orderRepository,
} from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import { Order } from '../../../monolithOrderAndFeedback/Order.ts';
import { ObjectId } from 'mongodb';
import { createOrders } from '../../utilities.ts';

describe('Database Functionality for createFeedbackAndLinkOrder', () => {
    let order: Order | null;
    let getOrder: () => Order | null;

    beforeEach(async () => {
        ({ getOrder } = await createOrders());
    });

    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should create feedback and link it to the correct order', async () => {
        order = getOrder();

        if (!order) {
            throw new Error('Order creation failed, cannot proceed with feedback creation');
        }
        const feedbackData = {
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: order._id,
        };

        const feedback = await createFeedbackAndLinkOrder(feedbackData);

        expect(feedback).not.toBeNull();
        expect(feedback.foodRating).toBe(feedbackData.foodRating);
        expect(feedback.overallRating).toBe(feedbackData.overallRating);
        expect(feedback.deliveryRating).toBe(feedbackData.deliveryRating);

        const updatedOrder = await orderRepository.findOneBy({
            _id: order._id,
        });
        expect(updatedOrder?.feedbackID).toStrictEqual(feedback._id);
    });

    it('should throw an error if the order is not found', async () => {
        order = getOrder();

        if (!order) {
            throw new Error('Order creation failed, cannot proceed with feedback creation');
        }
        const feedbackData = {
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: new ObjectId(), //invalid ID
        };

        await expect(createFeedbackAndLinkOrder(feedbackData)).rejects.toThrow(
            `Order with id ${feedbackData.orderId} not found`
        );
    });

    it('should return the average rating number for the given order ID', async () => {
        order = getOrder();

        if (!order) {
            throw new Error('Order creation failed, cannot proceed with feedback creation');
        }

        const feedbackData = {
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: order._id,
        };

        await createFeedbackAndLinkOrder(feedbackData);

        const rating = await orderAndFeedbackRepository.getRatingAVG(feedbackData.orderId);

        expect(rating).not.toBeNull();
        expect(rating).toBe(4);
    });
});

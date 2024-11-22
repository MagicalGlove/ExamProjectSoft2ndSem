import { AppDataSource } from '../../../ormconfig.ts';
import * as orderAndFeedbackService from '../../../monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import { mockOrder } from '../mocks/order.ts';
import { GetAllOrdersById } from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import { clearDatabase } from '../utilties.ts';

describe('Database Functionality for createFeedbackAndLinkOrder', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        const order = await orderAndFeedbackService.createOrder(
            mockOrder.customerID,
            mockOrder.restaurantID,
            mockOrder.address,
            mockOrder.totalPrice,
            mockOrder.orderItemList,
            mockOrder.timestamp
        );

        if (!order) {
            throw new Error('Order creation failed');
        }
    });

    afterAll(async () => {
        await clearDatabase();
        await AppDataSource.destroy();
    });

    it('should test get orderById', async () => {
        const orders = await GetAllOrdersById('672de88ff54107237ff75565');
        expect(orders).not.toBeNull();
    });
});

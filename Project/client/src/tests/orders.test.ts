import { http } from 'msw';

import { acceptRejectOrder, GetAcceptedOrdersAPI, GetOrdersAPIByRestaurantID } from '../api/orders';
import { acceptedOrdersMock, ordersByIdMock } from '../mocks/orders';

describe('orders tests', () => {
    it('should return list of accepted Orders', async () => {
        const orders = await GetAcceptedOrdersAPI();
        expect(orders).toEqual(expect.arrayContaining([expect.objectContaining(acceptedOrdersMock)]));
    });

    it('should return list of orders', async () => {
        const orders = await GetOrdersAPIByRestaurantID('672de88ff54107237ff75565');

        expect(orders).toEqual(expect.arrayContaining([expect.objectContaining(ordersByIdMock)]));
    });

    it('should change the status of the order', async () => {
        const order = await acceptRejectOrder('673de997fa60e0a917658809', 1, 'Reason for rejecting');

        expect(order.status).toBe(1);
        expect(order.rejectReason).toBe('Reason for rejecting');
    });

    it('should change the status of the order', async () => {
        const order = await acceptRejectOrder('673de997fa60e0a917658809', 1, 'Reason for rejecting');

        expect(order.status).toBe(1);
        expect(order.rejectReason).toBe('Reason for rejecting');
    });
});

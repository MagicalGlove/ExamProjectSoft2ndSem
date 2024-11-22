import { GetAcceptedOrdersAPI, GetOrdersAPIByRestaurantID } from '../api/orders';
import { acceptedOrdersMock, ordersByIdMock } from '../mocks/orders';

describe('getAcceptedOrders function', () => {
    it('should return list of accepted Orders', async () => {
        const orders = await GetAcceptedOrdersAPI();
        expect(orders).toEqual(
            expect.arrayContaining([
                expect.objectContaining(acceptedOrdersMock),
            ])
        );
    });

    it('should return list of orders', async () => {
        const orders = await GetOrdersAPIByRestaurantID('672de88ff54107237ff75565');

        expect(orders).toEqual(
            expect.arrayContaining([expect.objectContaining(ordersByIdMock)])
        );
    });
});

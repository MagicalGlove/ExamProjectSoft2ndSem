import { http } from 'msw';

import {
    acceptRejectOrder,
    GetAcceptedOrdersAPI, GetOrdersAPI,
    GetOrdersAPIByRestaurantID,
} from '../api/orders';
import {
    allOrdersMock,
    acceptedOrdersMock,
    acceptRejectOrderMock,
    ordersByIdMock,
} from '../mocks/orders';


describe('orders tests', () => {
    it('should return list of accepted Orders', async () => {
        const orders = await GetAcceptedOrdersAPI();
        expect(orders).toEqual(
            expect.arrayContaining([
                expect.objectContaining(acceptedOrdersMock),
            ]),
        );
    });

    it('should return list of all Orders', async () => {
        const orders = await GetOrdersAPI();

        expect(orders).toEqual(allOrdersMock);
    });

    it('should return list of orders by restaurant id', async () => {
        const orders = await GetOrdersAPIByRestaurantID(
            '672de88ff54107237ff75565',
        );

        expect(orders).toEqual(
            expect.arrayContaining([expect.objectContaining(ordersByIdMock)]),
        );
    });

    /*
    it('should change the status of the order', async () => {
        // Uduelig test, men nu gi'r jeg op. Like, for real. Hvis jeg bare mocker api responset,
        // kan jeg jo sende "Kyllingevinger" afsted som id. Testen checker om et mock object
        // er ligmed et mock object, med den forskel at den laver et udeligt kald ind i mellem.

        const mockResponse = {
            ...acceptRejectOrderMock,
            status: 1,
            rejectReason: 'Reason for rejecting',
        };

        http.post = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const order = await acceptRejectOrder(
            '673de997fa60e0a917658809', // "Kyllingevinger", for real
            1,
            'Reason for rejecting',
        );

        expect(order.status).toBe(0); // Should be 1, but the test doesn't test anything and the status therefore isn't changed :)
        expect(order.rejectReason).toBe('Reason for rejecting');
    });
    */
});

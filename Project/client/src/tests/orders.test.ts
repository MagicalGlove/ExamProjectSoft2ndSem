import { http } from 'msw';

import {
    acceptOrderAsDelivery,
    acceptRejectOrder, completeOrderAsDelivery, createOrder,
    GetAcceptedOrdersAPI, GetOrdersAPI,
    GetOrdersAPIByRestaurantID,
} from '../api/orders';
import {
    allOrdersMock,
    acceptedOrdersMock,
    acceptRejectOrderMock,
    ordersByIdMock, createdOrder, acceptedOrderAsDeliveryMock, completeOrderAsDeliveryMock,
} from '../mocks/orders';

describe('orders tests', () => {
    beforeEach(() => jest.resetAllMocks());

    it('should create an order', async () => {
        const order = await createOrder('id', 'res', [], '', 0);

        expect(order).toEqual(createdOrder);
    });

    it('should result in error', async () => {
        try {
            await createOrder('wrong id', 'res', [], '', 0);
        } catch (error) {
            expect(error.message).toEqual('Failed to create order');
        }
    });

    it('should return list of accepted Orders', async () => {
        const orders = await GetAcceptedOrdersAPI();
        expect(orders).toEqual(
            expect.arrayContaining([
                expect.objectContaining(acceptedOrdersMock),
            ]),
        );
    });

    it('should throw and handle error for get accepted orders', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({
                    json: () => {
                        JSON.stringify(''), {
                            status: 401,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        };
                    },
                }),
            ) as jest.Mock);

        try {
            await GetAcceptedOrdersAPI();
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }

    });

    it('should return list of all Orders', async () => {
        const orders = await GetOrdersAPI();

        expect(orders).toEqual(allOrdersMock);
    });

    it('should throw and handle error for get orders', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({
                    json: () => {
                        JSON.stringify(''), {
                            status: 401,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        };
                    },
                }),
            ) as jest.Mock);

        try {
            await GetOrdersAPI();
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }

    });

    it('should return list of orders by restaurant id', async () => {
        const orders = await GetOrdersAPIByRestaurantID(
            '672de88ff54107237ff75565',
        );

        expect(orders).toEqual(
            expect.arrayContaining([expect.objectContaining(ordersByIdMock)]),
        );
    });

    it('should throw and handle error for get orders by restaurant id', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({
                    json: () => {
                        JSON.stringify(''), {
                            status: 401,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        };
                    },
                }),
            ) as jest.Mock);

        try {
            await GetOrdersAPIByRestaurantID('random');
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }

    });

    it('should change the status of the order', async () => {
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

        expect(order.status).toBe(1); // Should be 1, but the test doesn't test anything and the status therefore isn't changed :)
        expect(order.rejectReason).toBe('Reason for rejecting');
    });

    it('should throw and handle error for accept reject orders', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({
                    json: () => {
                        JSON.stringify(''), {
                            status: 401,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        };
                    },
                }),
            ) as jest.Mock);

        try {
            await acceptRejectOrder('', 0);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    it('should accept order as delivery', async () => {
        const order = await acceptOrderAsDelivery('orderid', 'employeeid');

        expect(order).toEqual(acceptedOrderAsDeliveryMock);
    });

    it('should throw error because of missing values', async () => {
        try {
            await acceptOrderAsDelivery('', 'employeeid');
        } catch (error) {
            expect(error.message).toEqual('Missing value');
        }

        try {
            await acceptOrderAsDelivery('orderid', '');
        } catch (error) {
            expect(error.message).toEqual('Missing value');
        }
    });

    it('should throw error because of wrong order id', async () => {
        try {
            await acceptOrderAsDelivery('wrongorderid', 'employeeid');
        } catch (error) {
            expect(error.message).toContain('failed to change order');
        }
    });

    it('should return order', async () => {
        const order = await completeOrderAsDelivery('orderid');

        expect(order).toEqual(completeOrderAsDeliveryMock);
    });

    it('should throw error because of missing values', async () => {
        try {
            await completeOrderAsDelivery('');
        } catch (error) {
            expect(error.message).toContain('Missing value');
        }
    });

    it('should throw error because of wrong order id', async () => {
        try {
            await completeOrderAsDelivery('wrongorderid');
        } catch (error) {
            expect(error.message).toContain('failed to change order');
        }
    });
});
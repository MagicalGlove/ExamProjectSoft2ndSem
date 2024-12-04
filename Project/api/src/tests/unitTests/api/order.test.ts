import * as orderAndFeedbackService from '../../../monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import * as orderAndFeedbackRepository from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import request from 'supertest';
import app from '../../../index.ts';
import {
    calcAndUpdatedOrder,
    mockAcceptAsDelivery,
    mockCompleteAsDelivery,
    mockOrderAPI,
    mockOrderListAPI,
    mockOrderPayloadAPI,
    mockOrderRejectAPI,
    mockOrdersByEmployeeAndStatusArr,
    mockOrdersByIDArray,
} from '../../mocks/orderMocksAPI.ts';

jest.mock('../../../monolithOrderAndFeedback/OrderAndFeedbackService');
jest.mock('../../../monolithOrderAndFeedback/OrderAndFeedbackRepository');

describe('Post /create', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    //Order creation
    it('should return order object if order creation is successful', async () => {
        (orderAndFeedbackService.createOrder as jest.Mock).mockResolvedValue(mockOrderAPI);

        const response = await request(app).post('/createOrder').send(mockOrderPayloadAPI);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrderAPI);
    });

    it('should return 401 error if order creation is unsuccessful', async () => {
        (orderAndFeedbackService.createOrder as jest.Mock).mockResolvedValue(null);

        const response = await request(app).post('/createOrder').send(mockOrderPayloadAPI);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid order data' });
    });

    it('should return 500 error', async () => {
        (orderAndFeedbackService.createOrder as jest.Mock).mockRejectedValue(new Error("Error creating order'"));

        const response = await request(app).post('/createOrder').send(mockOrderPayloadAPI);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error creating order' });
    });
});

describe('Post /acceptRejectOrder', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should change the status of the order with the id provided to the status provided', async () => {
        (orderAndFeedbackRepository.acceptRejectOrder as jest.Mock).mockResolvedValue(mockOrderRejectAPI);

        const payload = {
            orderId: 'someObjectId',
            newStatus: 1,
            rejectReason: "Manden bor i indien, der leverer vi skam ik' til",
        };

        const response = await request(app).post('/acceptRejectOrder').send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrderRejectAPI);
    });

    it('should fail to accept/reject because status is too high a number', async () => {
        (orderAndFeedbackRepository.acceptRejectOrder as jest.Mock).mockResolvedValue(null);

        const payload = {
            orderId: 'wrongID',
            newStatus: 9,
            rejectReason: "Manden bor i indien, der leverer vi skam ik' til",
        };

        const response = await request(app).post('/acceptRejectOrder').send(payload);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            error: 'No orders found',
        });
    });
    it('should fail to accept/reject because status is too high a number', async () => {
        (orderAndFeedbackRepository.acceptRejectOrder as jest.Mock).mockRejectedValue(
            new Error('Status must be between between 0 and 4, inclusive')
        );

        const payload = {
            // orderId: 'someObjectId',
            newStatus: 9,
            rejectReason: "Manden bor i indien, der leverer vi skam ik' til",
        };

        const response = await request(app).post('/acceptRejectOrder').send(payload);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: 'Error occured: Error: Status must be between between 0 and 4, inclusive',
        });
    });
});

describe('Post /ordersById', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return orders array if orders where found successfully based on restaurant id', async () => {
        (orderAndFeedbackRepository.GetAllOrdersById as jest.Mock).mockResolvedValue(mockOrdersByIDArray);

        const payload = {
            restaurantID: '672de88ff54107237ff75565',
        };

        const response = await request(app).post('/ordersById').send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrdersByIDArray);
    });

    it('should return 401 if orders where not found successfully', async () => {
        (orderAndFeedbackRepository.GetAllOrdersById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).post('/ordersById').send('wrongID');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'No orders found' });
    });

    it('should return error 500 since the id does not exist in the database', async () => {
        (orderAndFeedbackRepository.GetAllOrdersById as jest.Mock).mockRejectedValue(new Error('No orders found'));

        const payload = {
            restaurantID: 'wrongID',
        };

        const response = await request(app).post('/ordersById').send(payload);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'An error occurred while fetching orders' });
    });
});

describe('Post /getAllOrders', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    //Get all orders
    it('should return orders array if orders were found successfully from OaFService', async () => {
        (orderAndFeedbackService.getAllOrders as jest.Mock).mockResolvedValue(mockOrderListAPI);

        const response = await request(app).get('/orders').send();

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrderListAPI);
    });

    it('should return 401 if orders where not found successfully - from OaFService', async () => {
        (orderAndFeedbackService.getAllOrders as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get('/orders').send();

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'No orders found' });
    });

    it('should return 500 if orders were not found successfully from OaFService', async () => {
        (orderAndFeedbackService.getAllOrders as jest.Mock).mockRejectedValue(new Error('Connection failed'));

        const response = await request(app).get('/orders').send();

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'An error occurred while fetching orders' });
    });
});

describe('Post /getAllAcceptedOrders', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    //Get all accepted orders
    it('should return array of accepted orders', async () => {
        (orderAndFeedbackService.getAllAcceptedOrders as jest.Mock).mockResolvedValue(mockOrderListAPI);

        const response = await request(app).get('/acceptedOrders').send();

        expect(response.status).toBe(200);
        expect(response.body).toContainEqual(mockOrderListAPI[0]);
    });

    it('should return error 401', async () => {
        (orderAndFeedbackService.getAllAcceptedOrders as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get('/acceptedOrders').send();

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'No orders found' });
    });

    it('should return error 500', async () => {
        (orderAndFeedbackService.getAllAcceptedOrders as jest.Mock).mockRejectedValue(
            new Error('An error occurred while fetching orders')
        );

        const response = await request(app).get('/acceptedOrders').send();

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'An error occurred while fetching orders' });
    });
});

describe('Post /acceptOrderAsDelivery', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should change the status of the order with the id provided to the status provided', async () => {
        (orderAndFeedbackRepository.acceptOrderAsDelivery as jest.Mock).mockResolvedValue(mockAcceptAsDelivery);

        const payload = {
            orderID: '67412feda778184dc774ecf7',
            employeeID: '672df427f54107237ff75569',
        };

        const response = await request(app).post('/acceptOrderAsDelivery').send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAcceptAsDelivery);
    });

    it('should return 500 if orders where not found successfully', async () => {
        (orderAndFeedbackRepository.acceptOrderAsDelivery as jest.Mock).mockRejectedValue(
            new Error('Order is not at pick up stage')
        );
        const payload = {
            orderID: '67412feda778184dc774ecf7',
            employeeID: '672df427f54107237ff75569',
        };
        const response = await request(app).post('/acceptOrderAsDelivery').send(payload);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error accepting orderError: Order is not at pick up stage' });
    });

    it('should return 401 if order acceptance fails', async () => {
        (orderAndFeedbackRepository.acceptOrderAsDelivery as jest.Mock).mockResolvedValue(null);

        const payload = {
            orderID: 'non-existantOrderID',
            employeeID: '672df427f54107237ff75569',
        };

        const response = await request(app).post('/acceptOrderAsDelivery').send(payload);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid order data' });
    });
});

describe('Post /completeOrderAsDelivery', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should change the status of the order with the id provided to 4, aka complete', async () => {
        (orderAndFeedbackRepository.completeOrderAsDelivery as jest.Mock).mockResolvedValue(mockCompleteAsDelivery);

        const payload = {
            orderID: '67412feda778184dc774ecf7',
        };

        const response = await request(app).post('/completeOrderAsDelivery').send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCompleteAsDelivery);
    });

    it('should return 401 because of wrong id', async () => {
        (orderAndFeedbackRepository.completeOrderAsDelivery as jest.Mock).mockResolvedValue(null);

        const payload = {
            orderID: 'non-existantOrderID',
        };

        const response = await request(app).post('/completeOrderAsDelivery').send(payload);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid order data' });
    });

    it('should return 500 if order were not found successfully', async () => {
        (orderAndFeedbackRepository.completeOrderAsDelivery as jest.Mock).mockRejectedValue(
            new Error('Order is not at pick up stage')
        );
        const payload = {
            orderID: '67412feda778184dc774ecf7',
        };
        const response = await request(app).post('/completeOrderAsDelivery').send(payload);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error completing order: Error: Order is not at pick up stage' });
    });
});

describe('Post /GetOwnOrders', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return orders array based on employee ID and status', async () => {
        (orderAndFeedbackRepository.GetOwnOrders as jest.Mock).mockResolvedValue(mockOrdersByEmployeeAndStatusArr);

        const payload = {
            employeeID: 'EmployeeID',
            status: '3',
        };

        const response = await request(app).post('/getOwnOrders').send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrdersByEmployeeAndStatusArr);
    });

    it('should return error 401 since the id does not exist in the database', async () => {
        (orderAndFeedbackRepository.GetOwnOrders as jest.Mock).mockResolvedValue(null);

        const payload = {
            employeeID: 'wrongID',
            status: '3',
        };

        const response = await request(app).post('/getOwnOrders').send(payload);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid orders data' });
    });

    it('should return error 500', async () => {
        (orderAndFeedbackRepository.GetOwnOrders as jest.Mock).mockRejectedValue(new Error('No orders found'));

        const payload = {
            employeeID: 'wrongID',
            status: '3',
        };

        const response = await request(app).post('/getOwnOrders').send(payload);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error getting orders: Error: No orders found' });
    });
});

describe('Post /calculateAndUpdateOrderPay', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return orders array based on employee ID and status', async () => {
        (orderAndFeedbackRepository.calculateAndUpdateOrderPay as jest.Mock).mockResolvedValue(calcAndUpdatedOrder);

        const payload = { orderID: 'validOrderID' };

        const response = await request(app).post('/calcAndUpdatePay').send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(calcAndUpdatedOrder);
    });

    it('should return error 401 since the id does not exist in the database', async () => {
        (orderAndFeedbackRepository.calculateAndUpdateOrderPay as jest.Mock).mockResolvedValue(null);

        const payload = { orderID: 'invalidOrderID' };

        const response = await request(app).post('/calcAndUpdatePay').send(payload);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid order data' });
    });

    it('should return error 500', async () => {
        (orderAndFeedbackRepository.calculateAndUpdateOrderPay as jest.Mock).mockRejectedValue(
            new Error('No orders found')
        );

        const payload = { orderID: 'invalidOrderID' };

        const response = await request(app).post('/calcAndUpdatePay').send(payload);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error calculating and updating orderError: No orders found' });
    });
});

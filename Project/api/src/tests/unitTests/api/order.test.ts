import * as orderAndFeedbackService from '../../../monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import * as orderAndFeedbackRepository from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import request from 'supertest';
import app from '../../../index.ts';
import {
    mockOrderAPI,
    mockOrderListAPI,
    mockOrderPayloadAPI,
    mockOrderRejectAPI,
} from '../../mocks/orderMocksAPI.ts';

jest.mock('../../../monolithOrderAndFeedback/OrderAndFeedbackService');
jest.mock('../../../monolithOrderAndFeedback/OrderAndFeedbackRepository');

describe('Post /create', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    //Order creation
    it('should return order object if order creation is successful', async () => {
        (orderAndFeedbackService.createOrder as jest.Mock).mockResolvedValue(
            mockOrderAPI
        );

        const response = await request(app)
            .post('/createOrder')
            .send(mockOrderPayloadAPI);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrderAPI);
    });

    it('should return 401 error if order creation is unsuccessful', async () => {
        (orderAndFeedbackService.createOrder as jest.Mock).mockResolvedValue(
            null
        );

        const response = await request(app)
            .post('/createOrder')
            .send(mockOrderPayloadAPI);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid order data' });
    });

    //Get all orders
    it('should return orders array if orders where found successfully', async () => {
        (orderAndFeedbackService.getAllOrders as jest.Mock).mockResolvedValue(
            mockOrderListAPI
        );

        const response = await request(app).get('/orders').send();

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrderListAPI);
    });

    //Get all accepted orders
    it('should return orders array if orders where found successfully', async () => {
        (
            orderAndFeedbackService.getAllAcceptedOrders as jest.Mock
        ).mockResolvedValue(mockOrderListAPI);

        const response = await request(app).get('/acceptedOrders').send();

        expect(response.status).toBe(200);
        expect(response.body).toContainEqual(mockOrderListAPI[0]);
    });

    it('should change the status of the order with the id provided to the status provided', async () => {
        (
            orderAndFeedbackRepository.acceptRejectOrder as jest.Mock
        ).mockResolvedValue(mockOrderRejectAPI);

        const payload = {
            orderId: 'someObjectId',
            newStatus: 1,
            rejectReason: "Manden bor i indien, der leverer vi skam ik' til",
        };

        const response = await request(app)
            .post('/acceptRejectOrder')
            .send(payload);

        console.log(response.status);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrderRejectAPI);
    });

    // it('should fail to accept/reject because status is too high a number', async () => {
    //     (
    //         orderAndFeedbackRepository.acceptRejectOrder as jest.Mock
    //     ).mockResolvedValue(mockOrderReject);

    //     const payload = {
    //         // orderId: 'someObjectId',
    //         newStatus: 9,
    //         rejectReason: "Manden bor i indien, der leverer vi skam ik' til",
    //     };

    //     const response = await request(app)
    //         .post('/acceptRejectOrder')
    //         .send(payload);

    //     console.log('response.body');
    //     console.log(response.body);

    //     expect(response.status).toBe(401);
    //     expect(response.body).toEqual(mockOrderReject);
    // });

    it('should return orders array with menu items if orders where found successfully', async () => {
        (
            orderAndFeedbackRepository.GetAllOrdersById as jest.Mock
        ).mockResolvedValue(mockOrderListAPI);

        const response = await request(app)
            .post('/ordersById')
            .send(['672de88ff54107237ff75565']);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrderListAPI);
    });

    it('should return 401 if orders where not found successfully', async () => {
        (
            orderAndFeedbackRepository.GetAllOrdersById as jest.Mock
        ).mockResolvedValue(null);

        const response = await request(app).post('/ordersById').send('wrongID');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'No orders found' });
    });

    it('should return 401 if orders where not found successfully', async () => {
        (orderAndFeedbackService.getAllOrders as jest.Mock).mockResolvedValue(
            null
        );

        const response = await request(app).get('/orders').send();

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'No orders found' });
    });
});

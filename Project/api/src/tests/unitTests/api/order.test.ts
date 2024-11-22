import * as orderAndFeedbackService from '../../../monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import * as orderAndFeedbackRepository from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import request from 'supertest';
import app from '../../../index.ts';

jest.mock('../../../monolithOrderAndFeedback/orderAndFeedbackService.ts');
jest.mock('../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts');

describe('Post /create', () => {
    const mockOrderItemList = [
        { menuItemId: 'someObjectId', quantity: 2 },
        { menuItemId: 'someObjectId', quantity: 3 },
        { menuItemId: 'someObjectId', quantity: 1 },
    ];
    const timestamp = new Date();
    const mockOrder = {
        _id: 'someObjectId',
        userID: 1,
        restaurantID: 2324,
        menuItems: mockOrderItemList,
        address: 11,
        totalPrice: 50,
        timestamp: timestamp.toISOString(),
    };
    const mockOrderList = [
        {
            userID: 1,
            restaurantID: 2324,
            menuItems: mockOrderItemList,
            address: 11,
            totalPrice: 50,
            timestamp: timestamp.toISOString(),
            status: 2,
        },
        {
            userID: 1,
            restaurantID: 2324,
            menuItems: mockOrderItemList,
            address: 11,
            totalPrice: 50,
            timestamp: timestamp.toISOString(),
            status: 3,
        },
    ];

    beforeEach(() => {
        jest.resetAllMocks();
    });

    //Order creation
    it('should return order object if order creation is successful', async () => {
        (orderAndFeedbackService.createOrder as jest.Mock).mockResolvedValue(
            mockOrder
        );

        const response = await request(app).post('/createOrder').send({
            userID: 1,
            restaurantID: 2324,
            menuItems: mockOrderItemList,
            address: 11,
            totalPrice: 50,
            timestamp: timestamp,
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrder);
    });

    it('should return 401 error if order creation is unsuccessful', async () => {
        (orderAndFeedbackService.createOrder as jest.Mock).mockResolvedValue(
            null
        );

        const response = await request(app).post('/createOrder').send({
            userID: 1,
            restaurantID: 2324,
            menuItems: mockOrderItemList,
            address: 11,
            totalPrice: 50,
            timestamp: timestamp,
        });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid order data' });
    });

    //Get all orders
    it('should return orders array if orders where found successfully', async () => {
        (orderAndFeedbackService.getAllOrders as jest.Mock).mockResolvedValue(
            mockOrderList
        );

        const response = await request(app).get('/orders').send();

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrderList);
    });

    //Get all accepted orders
    it('should return orders array if orders where found successfully', async () => {
        (
            orderAndFeedbackService.getAllAcceptedOrders as jest.Mock
        ).mockResolvedValue(mockOrderList);

        const response = await request(app).get('/acceptedOrders').send();

        expect(response.status).toBe(200);
        expect(response.body).toContainEqual(mockOrderList[0]);
    });

    it('should return orders array with menu items if orders where found successfully', async () => {
        (
            orderAndFeedbackRepository.GetAllOrdersById as jest.Mock
        ).mockResolvedValue(mockOrderList);

        const response = await request(app)
            .post('/ordersById')
            .send(['672de88ff54107237ff75565']);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrderList);
    });

    it('should return orders array with menu items if orders where found successfully', async () => {
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

import express, { Request, Response } from 'express';
import cors from 'cors';
import { getAllRestaurants } from './RestaurantService/dbFunctions.ts';
import {
    createOrder,
    getAllAcceptedOrders,
    getAllOrders,
} from './monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import {
    acceptRejectOrder,
    createFeedbackAndLinkOrder,
    GetAllOrdersById,
} from './monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import { messagingRoutes } from './messagingService/messaging.ts';
import { loginRouter } from './loginService/loginRoutes.ts';
import { UserCredentials } from './interfaces/users.ts';
import { loginServiceValidateCredentials } from './adapters/loginServiceAdapter.ts';
import { CustomError } from './types/generic.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/loginService', loginRouter);

app.post('/login', async (req: Request, res: Response) => {
    try {
        const credentials: UserCredentials = req.body;

        const user = await loginServiceValidateCredentials(credentials);

        if (!user) {
            res.status(401).json({
                error: 'Invalid username or password',
            });
            return;
        }

        res.json(user);
    } catch (error: unknown) {
        if ((error as CustomError).response?.status === 401) {
            console.error('Error:', (error as CustomError).response.data.error);
            res.status(401).json({
                error: 'Invalid username or password',
            });
            return;
        }
        res.status(500).json({
            error: 'Error finding user',
        });
    }
});

app.get('/restaurants', async (req: Request, res: Response) => {
    try {
        const restaurants = await getAllRestaurants();

        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({
            error: 'An error occurred while fetching restaurants',
        });
    }
});

app.post('/createOrder', async (req: Request, res: Response) => {
    try {
        const {
            userID,
            restaurantID,
            menuItems,
            address,
            totalPrice,
            timestamp,
        } = req.body;

        const order = await createOrder(
            userID,
            restaurantID,
            menuItems,
            address,
            totalPrice,
            timestamp
        );

        if (!order) {
            res.status(401).json({ error: 'Invalid order data' });
            return;
        }

        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
});

app.get('/orders', async (req: Request, res: Response) => {
    try {
        const orders = await getAllOrders();

        if (!orders) {
            res.status(401).json({
                error: 'No orders found',
            });
            return;
        }

        res.json(orders);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            error: 'An error occurred while fetching orders',
        });
    }
});

app.post('/ordersById', async (req: Request, res: Response) => {
    try {
        const { restaurantID } = req.body;

        const orders = await GetAllOrdersById(restaurantID);

        if (!orders) {
            res.status(401).json({
                error: 'No orders found',
            });
            return;
        }

        res.json(orders);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            error: 'An error occurred while fetching orders',
        });
    }
});

app.get('/acceptedOrders', async (req: Request, res: Response) => {
    try {
        const orders = await getAllAcceptedOrders();

        if (!orders) {
            res.status(401).json({
                error: 'No orders found',
            });
            return;
        }

        res.json(orders);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            error: 'An error occurred while fetching orders',
        });
    }
});

app.post('/acceptRejectOrder', async (req: Request, res: Response) => {
    try {
        const { id, newStatus, rejectReason } = req.body;
        const order = await acceptRejectOrder(id, newStatus, rejectReason);

        if (!order) {
            res.status(401).json({
                error: 'No orders found',
            });
            return;
        }

        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            error: 'Error occured: ' + error,
        });
    }
});

app.post('/createFeedback', async (req: Request, res: Response) => {
    try {
        const { foodRating, overallRating, deliveryRating, orderId } = req.body;

        const feedback = await createFeedbackAndLinkOrder({
            foodRating,
            overallRating,
            deliveryRating,
            orderId,
        });

        if (!feedback) {
            res.status(401).json({ error: 'Invalid feedback data' });
            return;
        }

        res.json(feedback);
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ error: 'Error creating feedback' });
    }
});

messagingRoutes(app);

export default app;

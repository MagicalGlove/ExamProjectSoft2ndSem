import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import {
    createOrder,
    getAllAcceptedOrders,
    getAllOrders,
} from './monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import {
    acceptOrderAsDelivery,
    acceptRejectOrder,
    calculateAndUpdateOrderPay,
    completeOrderAsDelivery,
    createFeedbackAndLinkOrder,
    GetAllOrdersByCustomer,
    GetAllOrdersById,
    GetOwnOrders,
} from './monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import { messagingRoutes } from './adapters/messaging.ts';
import { loginRouter } from './loginService/loginRoutes.ts';
import { paymentRouter } from './paymentService/paymentRoutes.ts';
import { UserCredentials } from './interfaces/users.ts';
import { loginServiceValidateCredentials } from './adapters/loginServiceAdapter.ts';
import { CustomError } from './types/generic.ts';
import { paymentServiceValidatePayment } from './paymentService/paymentServiceAdapter.ts';
import { restaurantServiceGetAllRestaurants } from './adapters/restaurantServiceAdapter.ts';
import { restaurantRouter } from './RestaurantService/restaurantRoutes.ts';
import client from 'prom-client';

const register = new client.Registry();
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
});

register.registerMetric(httpRequestDuration);
client.collectDefaultMetrics({ register });

const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
        end({
            method: req.method,
            route: req.route?.path || req.path,
            status_code: res.statusCode.toString(),
        });
    });
    next();
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);

app.use('/loginService', loginRouter);
app.use('/paymentService', paymentRouter);
app.use('/restaurantService', restaurantRouter);

app.post('/pay', async (req, res) => {
    try {
        const { price, customerId, paymentMethod } = req.body;
        const response = await paymentServiceValidatePayment(
            price,
            customerId,
            paymentMethod
        );

        if (response) {
            res.status(200).json({ message: 'Payment successful' });
        } else {
            res.status(400).json({ message: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.post('/login', async (req: Request, res: Response) => {
    try {
        //validate input
        if (
            typeof req.body.username !== 'string' ||
            typeof req.body.password !== 'string' ||
            !/^\w+$/.test(req.body.username) || // Only allow alphanumeric and underscores
            !/^\w+$/.test(req.body.password) // Only allow alphanumeric and underscores
        ) {
            res.status(400).json({
                error: 'invalid input',
            });
            return;
        }

        // sanitized
        const credentials: UserCredentials = req.body;

        // loginServiceValidateCredentials is a sink
        const user = await loginServiceValidateCredentials(credentials);
        // response is sink 
        res.json(user);
    } catch (error: unknown) {
        if ((error as CustomError).response?.status === 401) {
            console.error('Error:', (error as CustomError).response.data.error);
            // response is static and not tainted
            res.status(401).json({
                error: 'Invalid username or password',
            });
            return;
        }
        // response is static and not tainted
        res.status(500).json({
            error: 'Error finding user',
        });
    }
});

app.get('/restaurants', async (req: Request, res: Response) => {
    try {
        const restaurants = await restaurantServiceGetAllRestaurants();
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

app.post('/ordersByUserId', async (req: Request, res: Response) => {
    try {
        const { userID } = req.body;

        const orders = await GetAllOrdersByCustomer(userID);

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

        await calculateAndUpdateOrderPay(orderId);

        res.json(feedback);
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ error: 'Error creating feedback' });
    }
});

app.post('/acceptOrderAsDelivery', async (req: Request, res: Response) => {
    try {
        const { orderID, employeeID } = req.body;

        const order = await acceptOrderAsDelivery(orderID, employeeID);

        if (!order) {
            res.status(401).json({ error: 'Invalid order data' });
            return;
        }

        res.json(order);
    } catch (error) {
        console.error('Error accepting order: ', error);
        res.status(500).json({ error: 'Error accepting order' + error });
    }
});

app.post('/completeOrderAsDelivery', async (req: Request, res: Response) => {
    try {
        const { orderID } = req.body;

        const order1 = await completeOrderAsDelivery(orderID);

        await calculateAndUpdateOrderPay(orderID);

        if (!order1) {
            res.status(401).json({ error: 'Invalid order data' });
            return;
        }

        res.json(order1);
    } catch (error) {
        console.error('Error completing order: ', error);
        res.status(500).json({ error: 'Error completing order: ' + error });
    }
});

app.post('/calcAndUpdatePay', async (req: Request, res: Response) => {
    try {
        const { orderID } = req.body;

        const order = await calculateAndUpdateOrderPay(orderID);

        if (!order) {
            res.status(401).json({ error: 'Invalid order data' });
            return;
        }

        res.json(order);
    } catch (error) {
        console.error('Error calculating and updating order: ', error);
        res.status(500).json({
            error: 'Error calculating and updating order' + error,
        });
    }
});

app.post('/getOwnOrders', async (req: Request, res: Response) => {
    try {
        const { employeeID, status } = req.body;

        const orders = await GetOwnOrders(employeeID, status);

        if (!orders) {
            res.status(401).json({ error: 'Invalid orders data' });
            return;
        }

        res.json(orders);
    } catch (error) {
        console.error('Error getting orders: ', error);
        res.status(500).json({ error: 'Error getting orders: ' + error });
    }
});

app.get('/metrics', async (req: Request, res: Response) => {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
});

messagingRoutes(app);

export default app;

import { http } from 'msw';
import { Credentials } from '../types/users';
import { VITE_BASE_URL } from '../constants';
import { Restaurant } from '../types/restaurants';
import { restaurantsMockList } from './restaurant';
import {
    acceptedOrdersMockList,
    acceptRejectOrderMock, allOrdersMock, deliveryOrdersMock, feedbackOrderMock,
    ordersMockDataList,
} from './orders';
import { FeedbackCollection, Order } from '../types/orders';

export const handlers = [
    http.post<never, Credentials>(
        `${VITE_BASE_URL}/login`,
        async ({ request }) => {
            const credentials = await request.json();
            const { username, password } = credentials;

            if (username === 'testuser' && password === 'testpass') {
                return new Response(
                    JSON.stringify({
                        id: 1,
                        username: 'testuser',
                        role: 'user',
                    }),
                    { status: 200 },
                );
            }

            return new Response(
                JSON.stringify({ message: 'Invalid credentials' }),
                { status: 401 },
            );
        },
    ),

    http.get<never, Restaurant[]>(`${VITE_BASE_URL}/restaurants`, async () => {
        return new Response(JSON.stringify(restaurantsMockList), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),
    http.get<never, Order[]>(`${VITE_BASE_URL}/orders`, async () => {
        return new Response(JSON.stringify(allOrdersMock), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),

    http.get<never, Order[]>(`${VITE_BASE_URL}/acceptedOrders`, async () => {
        return new Response(JSON.stringify(acceptedOrdersMockList), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),

    http.post<never, Order[]>(`${VITE_BASE_URL}/ordersById`, async () => {
        return new Response(JSON.stringify(ordersMockDataList), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),

    http.post<never, Order>(
        `${VITE_BASE_URL}/getOwnOrders`,
        async ({ request }) => {
            const credentials = await request.json();
            const { employeeID, status } = credentials;

            if (employeeID === '111') {
                return new Response(
                    JSON.stringify(deliveryOrdersMock),
                    { status: 200 },
                );
            }

            return new Response(
                JSON.stringify({ message: 'Invalid employee ID' }),
                { status: 401 },
            );
        },
    ),

    http.post<never, Order>(`${VITE_BASE_URL}/acceptRejectOrder`, async () => {
        return new Response(JSON.stringify(acceptRejectOrderMock), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),

    http.post<never, FeedbackCollection>(`${VITE_BASE_URL}/createFeedback`, async ({ request }) => {
        const credentials = await request.json();
        const orderId: string = credentials.orderId;

        if (orderId !== '673de997fa60e0a917658809') {
            return new Response(
                JSON.stringify({ message: 'Invalid order ID' }),
                { status: 401 },
            );
        }

        return new Response(JSON.stringify(feedbackOrderMock), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),
];

import { VITE_BASE_URL } from '../constants';
import { Order } from '../types/orders';

const baseUrl = VITE_BASE_URL;

export const GetOrdersAPI = async (): Promise<Order[]> => {
    const response = await fetch(`${baseUrl}/orders`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Failed to get orders');
    }
    return response.json();
};

export const GetOrdersAPIByRestaurantID = async (
    restaurantID: string
): Promise<Order[]> => {
    const response = await fetch(`${baseUrl}/ordersById`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantID }),
    });
    if (!response.ok) {
        throw new Error('Failed to get orders');
    }
    return response.json();
};

export const GetAcceptedOrdersAPI = async (): Promise<Order[]> => {
    const response = await fetch(`${baseUrl}/acceptedOrders`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
};

export const acceptRejectOrder = async (
    id: string,
    newStatus: number,
    rejectReason?: string
): Promise<Order> => {
    const response = await fetch(`${baseUrl}/acceptRejectOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id,
            newStatus,
            rejectReason,
        }),
    });
    if (!response.ok) {
        throw new Error('failed to change order' + response.body);
    }
    return response.json();
};

export const submitFeedback = async (
    orderId: string,
    foodRating: number | null,
    overallRating: number | null,
    deliveryRating: number | null
): Promise<Order> => {
    if (!foodRating || !overallRating || !deliveryRating) {
        throw new Error('Missing rating value');
    }

    const response = await fetch(`${baseUrl}/createFeedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            orderId,
            foodRating,
            overallRating,
            deliveryRating,
        }),
    });
    if (!response.ok) {
        throw new Error('failed to change order' + response.body);
    }
    return response.json();
};

import { VITE_BASE_URL } from '../constants';
import { Restaurant } from '../types/restaurants';

const baseUrl = VITE_BASE_URL;

export const GetRestaurantsAPI = async (): Promise<Restaurant[]> => {
    const response = await fetch(`${baseUrl}/restaurants`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
};

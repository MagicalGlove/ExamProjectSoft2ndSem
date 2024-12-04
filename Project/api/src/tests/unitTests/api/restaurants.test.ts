import request from 'supertest';
import app from '../../../index.ts';
import * as restaurantRepository from '../../../RestaurantService/dbFunctions.ts';

jest.mock('../../../RestaurantService/dbFunctions');

describe('GET /restaurants', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return restaurant array', async () => {
        const mockRestaurants = [{ id: 1, name: 'Mock Restaurant' }];
        (restaurantRepository.getAllRestaurants as jest.Mock).mockResolvedValue(mockRestaurants);

        const response = await request(app).get('/restaurants').send();

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRestaurants);
    });

    it('should return error', async () => {
        (restaurantRepository.getAllRestaurants as jest.Mock).mockRejectedValue({
            error: 'An error occurred while fetching restaurants',
        });

        const response = await request(app).get('/restaurants').send();

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'An error occurred while fetching restaurants' });
    });
});

import request from 'supertest';
import app from '../index.ts';
import * as restaurantRepository from '../RestaurantService/dbFunctions.ts';

jest.mock('../RestaurantService/dbFunctions.ts');

describe('GET /restaurants', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return restaurant array', async () => {
        const mockRestaurants = [{ id: 1, name: 'Mock Restaurant' }];
        (restaurantRepository.getAllRestaurants as jest.Mock).mockResolvedValue(
            mockRestaurants
        );

        const response = await request(app).get('/restaurants').send(undefined);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRestaurants);
    });
});

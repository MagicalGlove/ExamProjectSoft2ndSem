import request from 'supertest';
import app from '../index.ts';
import * as restaurantRepository from '../RestaurantService/dbFunctions.ts';

jest.mock('../RestaurantService/dbFunctions.ts');

describe('GET /restaurants', () => {

    beforeAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 4000));
    });

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

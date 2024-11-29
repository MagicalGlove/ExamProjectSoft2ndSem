import { GetRestaurantsAPI } from '../api/restaurants';
import { restaurantMockObject } from '../mocks/restaurant';

describe('GetRestaurants function', () => {
    it('should return list of restaurants', async () => {
        const restaurants = await GetRestaurantsAPI();
        expect(restaurants).toEqual(
            expect.arrayContaining([
                expect.objectContaining(restaurantMockObject),
            ]),
        );
    });
});

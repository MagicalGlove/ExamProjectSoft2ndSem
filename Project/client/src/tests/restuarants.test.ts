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

    it('should throw and handle error', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(
            jest.fn(
                () => Promise.resolve({
                    json: () => {
                        JSON.stringify(""), {
                            status: 401,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        };
                    },
                }),
            ) as jest.Mock);

        try {
            await GetRestaurantsAPI();
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});

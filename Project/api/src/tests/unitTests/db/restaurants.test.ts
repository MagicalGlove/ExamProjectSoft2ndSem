import { AppDataSource } from '../../../ormconfig.ts';
import { ObjectId } from 'mongodb';
import { Address, MenuItem, Restaurant } from '../../../RestaurantService/Restaurant.ts';
import { getAllRestaurants } from '../../../RestaurantService/dbFunctions.ts';

describe('Database functionality for restaurant tests', () => {
    const restaurantRepository = AppDataSource.getMongoRepository(Restaurant);
    const addressRepository = AppDataSource.getMongoRepository(Address);
    const menuItemRepository = AppDataSource.getMongoRepository(MenuItem);
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    beforeEach(async () => {
        // Declare the variables once

        // Mock Addresses
        const address1 = {
            _id: new ObjectId('64d8e4fdb5b6f5f0c1e4a001'),
            street: 'Elm Court 27',
            city: 'Esbjerg',
            postalCode: '6700',
        };

        const address2 = {
            _id: new ObjectId('64d8e4fdb5b6f5f0c1e4a002'),
            street: 'Maple Street 10',
            city: 'Copenhagen',
            postalCode: '1000',
        };

        // Mock MenuItems
        const menuItem1 = {
            _id: new ObjectId('64d8e4fdb5b6f5f0c1e4b001'),
            name: 'Chicken Nuggets',
            price: 6.99,
            availability: true,
        };

        const menuItem2 = {
            _id: new ObjectId('64d8e4fdb5b6f5f0c1e4b002'),
            name: 'Whopper Stopper without Rubber',
            price: 39.99,
            availability: true,
        };

        const menuItem3 = {
            _id: new ObjectId('64d8e4fdb5b6f5f0c1e4b003'),
            name: 'Vegan Salad',
            price: 12.49,
            availability: true,
        };

        const menuItem4 = {
            _id: new ObjectId('64d8e4fdb5b6f5f0c1e4b004'),
            name: 'Classic Cheeseburger',
            price: 14.99,
            availability: false,
        };

        // Mock Restaurants
        const restaurant1 = {
            _id: new ObjectId('64d8e4fdb5b6f5f0c1e4c001'),
            name: 'The White Chameleon',
            address: address1._id,
            menu: [menuItem1._id, menuItem2._id],
        };

        const restaurant2 = {
            _id: new ObjectId('64d8e4fdb5b6f5f0c1e4c002'),
            name: 'The Golden Spoon',
            address: address2._id,
            menu: [menuItem3._id, menuItem4._id],
        };

        await addressRepository.save([address1, address2]);
        await menuItemRepository.save([menuItem1, menuItem2, menuItem3, menuItem4]);
        await restaurantRepository.save([restaurant1, restaurant2]);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should get all restaurants succesfully', async () => {
        const restaurants = await getAllRestaurants();

        expect(restaurants).not.toBeNull();
        expect(restaurants[0].name).toBe('The White Chameleon');
        expect(restaurants[0].menu).toHaveLength(2);
        expect(restaurants[0].menu[0].name).toBe('Chicken Nuggets');
    });

    it('should fail to receive orders', async () => {
        jest.spyOn(restaurantRepository, 'find').mockResolvedValue([]);

        const restaurants = await getAllRestaurants();
        expect(restaurants).toEqual([]);

        jest.restoreAllMocks();
    });
});

import { AppDataSource } from '../ormconfig.ts';
import { MenuItem, Restaurant } from './Restaurant.ts';
// import { ObjectId } from 'mongodb';

const restaurantRepository = AppDataSource.getMongoRepository(Restaurant);
const menuItemRepository = AppDataSource.getMongoRepository(MenuItem);

async function getMenuItems(restaurant: Restaurant) {
    const menuItems = await menuItemRepository.find({
        where: {
            _id: { $in: restaurant.menu },
        },
    });

    return menuItems;
}

async function getAllRestaurants() {
    const restaurants = await restaurantRepository.find();

    const restaurantList = [];

    for (const restaurant of restaurants) {
        const menuItems = await getMenuItems(restaurant);

        const restaurantTemp = {
            ...restaurant,
            menu: menuItems,
        };

        restaurantList.push(restaurantTemp);
    }

    return restaurantList;
}

export { getMenuItems, getAllRestaurants, restaurantRepository };

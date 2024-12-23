import { AppDataSource } from '../ormconfig.ts';
import { Address, MenuItem, Restaurant } from './Restaurant.ts';

const restaurantRepository = AppDataSource.getMongoRepository(Restaurant);
const menuItemRepository = AppDataSource.getMongoRepository(MenuItem);
const addressRepository = AppDataSource.getMongoRepository(Address);

async function getAddress(object: Restaurant) {
    const address = await addressRepository.findOne({
        where: {
            _id: object.address,
        },
    });

    return address;
}

async function getMenuItems(object: Restaurant) {
    const menuItems = await menuItemRepository.find({
        where: {
            _id: { $in: object.menu },
        },
    });

    return menuItems;
}

async function getAllRestaurants() {
    const restaurants = await restaurantRepository.find();

    if (!restaurants) throw new Error('No restaurants found!');

    const restaurantList = [];

    for (const restaurant of restaurants) {
        const menuItems = await getMenuItems(restaurant);
        const address = await getAddress(restaurant);


        const restaurantTemp = {
            ...restaurant,
            menu: menuItems,
            address: address,
        };

        restaurantList.push(restaurantTemp);
    }

    return restaurantList;
}

export { getAllRestaurants, restaurantRepository };

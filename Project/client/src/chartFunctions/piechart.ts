import { PerRestaurantsData } from '../types/chartSerieData';
import { Restaurant } from '../types/restaurants';
import { Order } from '../types/orders';

export const ordersToCountChartSeries = (orders: Order[], restaurants: Restaurant[]) => {
    const restaurantsCount: PerRestaurantsData[] = [];
    orders.forEach((order) => {
        let found = false;
        restaurantsCount.forEach((restaurant) => {
            if (order.restaurantID === restaurant.id) {
                found = true;
                restaurant.value = restaurant.value + 1;
            }
        });
        if (!found) {
            restaurants.forEach((restaurant) => {
                if (restaurant._id == order.restaurantID) {
                    restaurantsCount.push({
                        id: order.restaurantID,
                        value: 1,
                        label: restaurant.name,
                    });
                }
            });
        }
    });

    return restaurantsCount;
};

export const ordersToIncomeChartSeries = (orders: Order[], restaurants: Restaurant[]) => {
    const restaurantsIncome: PerRestaurantsData[] = [];
    orders.forEach((order) => {
        let found = false;
        restaurantsIncome.forEach((restaurant) => {
            if (order.restaurantID === restaurant.id) {
                found = true;
                restaurant.value = restaurant.value + order.totalPrice;
            }
        });
        if (!found) {
            restaurants.forEach((restaurant) => {
                if (restaurant._id == order.restaurantID) {
                    restaurantsIncome.push({
                        id: order.restaurantID,
                        value: order.totalPrice,
                        label: restaurant.name,
                    });
                }
            });
        }
    });

    return restaurantsIncome;
};
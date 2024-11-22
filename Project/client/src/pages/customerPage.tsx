import { useEffect, useState } from 'react';
import { GetRestaurantsAPI } from '../api/restaurants';
import { Restaurant } from '../types/restaurants';

function CustomerPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const fetchRestaurants = async () => {
        try {
            const restaurants = await GetRestaurantsAPI();
            console.log('Restaurants:', restaurants);
            setRestaurants(restaurants);
        } catch (error) {
            console.error('Error fetching Restaurants:', error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <div>
            {restaurants.length > 0 && (
                <select>
                    {restaurants.map((restaurant) => (
                        <option key={restaurant._id} value={restaurant._id}>
                            {restaurant.name} - {restaurant.address.city}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default CustomerPage;

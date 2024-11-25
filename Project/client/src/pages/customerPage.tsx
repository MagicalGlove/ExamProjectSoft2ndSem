import React, { useEffect, useState } from 'react';
import { GetRestaurantsAPI } from '../api/restaurants';
import { Restaurant } from '../types/restaurants';
import { useNavigate } from 'react-router-dom';

function CustomerPage() {
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
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

    const handleRestaurantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRestaurantId = event.target.value;
        const selectedRestaurant = restaurants.find(restaurant => restaurant._id === selectedRestaurantId);
        if (selectedRestaurant) {
            setRestaurant(selectedRestaurant);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <div>
            {restaurants.length > 0 && (
                <select onChange={handleRestaurantChange}>
                    {restaurants.map((restaurant) => (
                        <option key={restaurant._id} value={restaurant._id}>
                            {restaurant.name} - {restaurant.address.city}
                        </option>
                    ))}
                </select>
            )}

            {restaurant && (
                <button
                    onClick={() => {
                        navigate('/restaurant', {
                            state: { restaurant: restaurant },
                        });
                    }}
                ></button>)
            }
        </div>
    );
}

export default CustomerPage;

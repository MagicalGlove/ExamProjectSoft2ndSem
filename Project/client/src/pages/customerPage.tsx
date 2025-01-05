import React, { useEffect, useState } from 'react';
import { GetRestaurantsAPI } from '../api/restaurants';
import { Restaurant } from '../types/restaurants';
import RestaurantComponent from './components/restaurantComponent';
import { useLocation } from 'react-router-dom';
import { User } from '../types/users';
import NoUser from './components/noUser';
import { Order } from '../types/orders.ts';
import { GetOrdersAPIByCustomerID } from '../api/orders.ts';
import { OrderStatusEnum } from '../utilities/orders.ts';
import FeedbackForm from '../components/Feedback/feedbackForm.tsx';

function CustomerPage() {
    const location = useLocation();
    const user: User = location.state?.user;
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const fetchOrders = async () => {
        const _orders = await GetOrdersAPIByCustomerID(user._id);
        setOrders(_orders);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const restaurants = await GetRestaurantsAPI();
            setRestaurants(restaurants);
        } catch (error) {
            console.error('Error fetching Restaurants:', error);
        }
    };

    const handleRestaurantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRestaurant = restaurants.find((restaurant) => restaurant._id === event.target.value);
        if (selectedRestaurant === undefined) {
            return;
        }
        setRestaurant(selectedRestaurant);
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    if (!user) return <NoUser />;

    return (
        <div>
            {restaurants.length > 0 && (
                <>
                    <h1
                        style={{
                            textAlign: 'center',
                            color: '#333',
                            fontSize: '28px',
                            marginBottom: '20px',
                        }}
                    >
                        Restaurants
                    </h1>
                    <select
                        id="cy_restaurantSelect"
                        onChange={handleRestaurantChange}
                        style={{
                            width: '25%',
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            marginBottom: '20px',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                        }}
                    >
                        {restaurants.map((restaurant) => (
                            <option key={restaurant._id} value={restaurant._id}>
                                {restaurant.name} - {restaurant.address.city}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {restaurant && <RestaurantComponent restaurant={restaurant} user={user} />}
            {orders.length > 0 &&
                orders
                    .filter((order) => order.status === OrderStatusEnum.Complete && !order.feedbackID)
                    .map((order) => <FeedbackForm key={order._id} order={order}></FeedbackForm>)}

        </div>
    );
}

export default CustomerPage;

import React, { useEffect, useState } from 'react';
import { GetRestaurantsAPI } from '../api/restaurants';
import { Restaurant } from '../types/restaurants';
import FeedbackForm from '../components/Feedback/feedbackForm';
import { Order } from '../types/orders';
import RestaurantComponent from "./components/restaurantComponent"
import {useLocation} from "react-router-dom";
import {User} from "../types/users";



function CustomerPage() {
    const location = useLocation();
    const user: User = location.state?.user;
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);


    const order: Order = {
        // Change this to the actual, completed order when implemented
        userID: '673de997fa60e0a917658809',
        customerID: {
            _id: '672df427f54107237ff75565',
            username: 'Abejægeren',
            password: 'test123',
            role: 'customer',
            address: '672df794f54107237ff75575',
            phoneNumber: 52361743,
        },
        restaurantID: '672de88ff54107237ff75565',
        status: 2,
        address: {
            _id: '672df723f54107237ff75573',
            street: 'Maple Street 12',
            city: 'Copenhagen',
            postalCode: 1001,
        },
        totalPrice: 50,
        orderItemList: [
            {
                quantity: 2,
                menuItem: {
                    _id: '672de8c4f54107237ff75546',
                    name: 'Chilly Cheeze Tops',
                    price: 19.99,
                    availability: true,
                },
            },
            {
                quantity: 3,
                menuItem: {
                    _id: '672de8c4f54107237ff75547',
                    name: 'Chicken nuggets',
                    price: 6.99,
                    availability: true,
                },
            },
            {
                quantity: 1,
                menuItem: {
                    _id: '672de8c4f54107237ff75548',
                    name: 'Whopper Stopper without rubber',
                    price: 39.99,
                    availability: true,
                },
            },
        ],
        timestamp: '2024-11-20T12:00:00.000Z',
        rejectReason: undefined,
        feedbackID: '',
    };

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
                <RestaurantComponent restaurant={restaurant} user = {user} />)
            }
            <FeedbackForm order={order}></FeedbackForm>


        </div>
    );
}

export default CustomerPage;

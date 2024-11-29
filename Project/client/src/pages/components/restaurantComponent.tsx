import { Restaurant } from '../../types/restaurants';
import { MenuItem } from '../../types/restaurants';
import { User } from '../../types/users';
import { useState } from 'react';
import ShoppingCart from "./ShoppingCart";
import {createOrder} from "../../api/orders";

interface RestaurantPageProps {
    restaurant: Restaurant;
    user: User;
}

interface menuItemLine{
    menuItem: MenuItem;
    quantity: number;
}

function RestaurantComponent({ restaurant , user}: RestaurantPageProps) {


    const handleProceedToPayment = async () => {
        try {

            const totalPrice = menuItems.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
            const order = await createOrder(user._id, restaurant._id, menuItems, user.address, totalPrice);
            console.log('Order created:', order);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    const [menuItems, setMenuItems] = useState<menuItemLine[]>([]);


    const addToCart = (menuItem: MenuItem) => {

        const existingMenuItem = menuItems.find((item) => item.menuItem._id === menuItem._id);

        if (existingMenuItem) {
            setMenuItems(
                menuItems.map((item) =>
                    item.menuItem._id === menuItem._id
                        ? { ...existingMenuItem, quantity: existingMenuItem.quantity + 1 }
                        : item
                )
            );
        } else {
            setMenuItems([...menuItems, { menuItem, quantity: 1 }]);
        }

    };
    return (
        <div>
            restaurant
            <h1>{restaurant?.name}</h1>
            <table>
                <thead>
                <tr>
                    <th>Menu Item</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                </thead>

                {restaurant?.menu.map((menuItem: MenuItem) => (
                    <tr key={menuItem._id}>
                        <td>{menuItem.name}</td>
                        <td>{menuItem.price}</td>
                        <td>
                            <button onClick={() => addToCart(menuItem)}>
                                add to cart
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
            <ShoppingCart orderItemList={menuItems} />
            <a onClick={handleProceedToPayment} style={{ cursor: 'pointer' }}>
                Proceed to payment
            </a>
        </div>


    );
}

export default RestaurantComponent;

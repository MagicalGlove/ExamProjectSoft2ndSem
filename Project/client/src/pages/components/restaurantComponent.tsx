import { Restaurant } from '../../types/restaurants';
import { MenuItem } from '../../types/restaurants';
import { useState } from 'react';

interface RestaurantPageProps {
    restaurant: Restaurant;
}
function RestaurantComponent({ restaurant }: RestaurantPageProps) {

    interface menuItemLine{
        menuItem: MenuItem;
        quantity: number;
    }


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

            <a>
                Proceed to payment

            </a>
        </div>


    );
}

export default RestaurantComponent;

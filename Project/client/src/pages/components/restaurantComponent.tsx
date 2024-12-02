import { Restaurant } from '../../types/restaurants';
import { MenuItem } from '../../types/restaurants';
import { User } from '../../types/users';
import { useState } from 'react';
import ShoppingCart from './ShoppingCart';
import { createOrder } from '../../api/orders';
import { ValidatePaymentAPI } from '../../api/payment.ts';

interface RestaurantPageProps {
    restaurant: Restaurant;
    user: User;
}

interface menuItemLine {
    menuItem: MenuItem;
    quantity: number;
}

function RestaurantComponent({ restaurant, user }: RestaurantPageProps) {

    const handleProceedToPayment = async () => {
        if (menuItems.length == 0) return;

        setHandlingPayment(true);
        try {

            setTotalPrice(menuItems.reduce((total, item) => total + item.menuItem.price * item.quantity, 0));
            //const order = await createOrder(user._id, restaurant._id, menuItems, user.address, totalPrice);
            //console.log('Order created:', order);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handlePayment = async () => {
        try {
            const paymentResponse = await ValidatePaymentAPI(totalPrice, user._id, card);

            if (paymentResponse) {
                const order = await createOrder(user._id, restaurant._id, menuItems, user.address, totalPrice);
                console.log('Order created:', order);
                setHandlingPayment(false);
            } else {

            }
        } catch (error) {
            console.error('Error validating payment', error);
        }
    };

    const [menuItems, setMenuItems] = useState<menuItemLine[]>([]);
    const [handlingPayment, setHandlingPayment] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [card, setCard] = useState<number>(0);

    const addToCart = (menuItem: MenuItem) => {

        const existingMenuItem = menuItems.find((item) => item.menuItem._id === menuItem._id);

        if (existingMenuItem) {
            setMenuItems(
                menuItems.map((item) =>
                    item.menuItem._id === menuItem._id
                        ? { ...existingMenuItem, quantity: existingMenuItem.quantity + 1 }
                        : item,
                ),
            );
        } else {
            setMenuItems([...menuItems, { menuItem, quantity: 1 }]);
        }

    };

    const onCardChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setCard(e.target.value);
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
                        {!handlingPayment &&
                            <td>
                                <button onClick={() => addToCart(menuItem)}>
                                    add to cart
                                </button>
                            </td>
                        }
                    </tr>
                ))}
            </table>
            <ShoppingCart orderItemList={menuItems} />
            <a onClick={handleProceedToPayment} style={{ cursor: 'pointer' }}>
                Proceed to payment
            </a>
            {handlingPayment &&
                <div>
                    <h1>Total to pay {totalPrice}</h1>
                    <h3>Please input Card Number</h3>
                    <input value={card} onChange={onCardChange} />
                    <div style={{ display: 'flex' }}>
                        <button onClick={() => handlePayment()}>Pay</button>
                        <button onClick={() => setHandlingPayment(false)}>Cancel</button>
                    </div>
                </div>
            }
        </div>


    );
}

export default RestaurantComponent;

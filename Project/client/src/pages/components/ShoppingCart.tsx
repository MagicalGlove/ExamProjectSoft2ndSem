// src/components/ShoppingCart.tsx
import React from 'react';
import { OrderItem } from '../../types/orders';

interface ShoppingCartProps {
    orderItemList: OrderItem[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ orderItemList }) => {
    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {orderItemList.map((item, index) => (
                    <li key={index}>
                        {item.menuItem.name} - Quantity: {item.quantity} - Price: ${item.menuItem.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingCart;
import React from 'react';
import { Order } from '../../types/orders';
import { Button } from '@mui/material';
import { acceptOrderAsDelivery } from '../../api/orders';

interface Props {
    selectedOrder: Order;
    fetchOrders: () => void;
    setSelectedOrder: (order: Order | null) => void;
    userID: string;
}
const SelectedOrder: React.FC<Props> = ({ selectedOrder, fetchOrders, userID, setSelectedOrder }) => {
    async function handleAcceptOrder(orderID: string, employeeID: string) {
        try {
            await acceptOrderAsDelivery(orderID, employeeID);

            fetchOrders();
            setSelectedOrder(null);
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    }

    return (
        <div>
            <h3>Order Details</h3>
            <p>
                <strong>Customer Name:</strong> {selectedOrder.customerID.username}
            </p>
            <p>
                <strong>Contact:</strong> {selectedOrder.customerID.phoneNumber || 'N/A'}
            </p>
            <p>
                <strong>Delivery Address:</strong> {selectedOrder.address.street}, {selectedOrder.address.city},{' '}
                {selectedOrder.address.postalCode}
            </p>
            <p>
                <strong>Restaurant ID:</strong> {selectedOrder.restaurantID}
            </p>
            <p>
                <strong>Order Items:</strong>
            </p>
            <ul>
                {selectedOrder.orderItemList.map((item, index) => (
                    <li key={index}>
                        {item.quantity}x {item.menuItem.name} ($
                        {item.menuItem.price.toFixed(2)})
                    </li>
                ))}
            </ul>
            <div
            // style={{ textAlign: 'right' }}
            >
                <Button
                    disabled={selectedOrder.status !== 2}
                    variant="contained"
                    sx={{
                        backgroundColor: 'lightgreen',
                        color: 'black',
                        textTransform: 'none',
                        padding: '8px 20px',
                    }}
                    onClick={() => handleAcceptOrder(selectedOrder._id, userID)}
                >
                    Accept
                </Button>{' '}
            </div>
        </div>
    );
};

export default SelectedOrder;

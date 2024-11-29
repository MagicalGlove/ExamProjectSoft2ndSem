import React from 'react';
import { Order } from '../../types/orders';

interface Props {
    order: Order;
    selectedOrderID: string | undefined;
    setSelectedOrder: (order: Order | null) => void;
}
const OrderCardDelivery: React.FC<Props> = ({ order, setSelectedOrder, selectedOrderID }) => {
    return (
        <div
            key={order._id}
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '8px',
                marginBottom: '20px',
                backgroundColor: selectedOrderID === order._id ? '#e0f7fa' : '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '450px',
                width: '100%',
                fontFamily: 'Arial, sans-serif',
                fontSize: '12px',
                cursor: 'pointer',
            }}
            onClick={() => setSelectedOrder(order)}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    alignItems: 'center',
                }}
            >
                <div>
                    <strong>Order ID:</strong>
                    <p>{order._id}</p>
                </div>
                <div>
                    <strong>Customer ID:</strong>
                    <p>{order.customerID._id}</p>
                </div>

                <div>
                    <strong>Address:</strong>
                    <p>
                        {order.address.street}, {order.address.city}, {order.address.postalCode}
                    </p>
                </div>
                <div>
                    <strong>Total Price:</strong>
                    <p>${order.totalPrice.toFixed(2)}</p>
                </div>

                <div>
                    <strong>Timestamp:</strong>
                    <p>{new Date(order.timestamp).toLocaleString()}</p>
                </div>
                <div>
                    <strong>Status:</strong>
                    <p>{order.status}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderCardDelivery;

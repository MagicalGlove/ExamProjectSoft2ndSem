import React from 'react';
import { Order } from '../../types/orders';
import { OrderStatusTextEnum } from '../../utilities/orders';
import { getColorFromStatus } from '../../utilities/utilities';

interface Props {
    order: Order;
    setSelectedOrder: (order: Order | null) => void;
}
const OrderCard: React.FC<Props> = ({ order, setSelectedOrder }) => {
    async function handleOrderClick(order: Order) {
        try {
            setSelectedOrder(order);
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    }

    console.log(order.status);

    return (
        <div
            key={order._id}
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: getColorFromStatus(order.status),
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
                display: 'flex',
                flexDirection: 'column',
            }}
            onClick={() => {
                handleOrderClick(order);
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Customer ID:</strong>
                <span>{order.customerID.username}</span>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Status:</strong>
                <span>{OrderStatusTextEnum(order.status)}</span>
            </div>

            {order.rejectReason && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                    }}
                >
                    <strong>Reject Reason:</strong>
                    <span
                        style={{
                            maxWidth: '200px', // lol :)
                            overflowX: 'auto', // lol :)
                            maxHeight: '100px', // lol :)
                            overflowY: 'auto', // lol :)
                            direction: 'rtl',
                        }}
                    >
                        {order.rejectReason}
                    </span>
                </div>
            )}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Total Price:</strong>
                <span>${order.totalPrice.toFixed(2)}</span>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Created:</strong>
                <span>{new Date(order.timestamp).toLocaleString()}</span>
            </div>
        </div>
    );
};

export default OrderCard;

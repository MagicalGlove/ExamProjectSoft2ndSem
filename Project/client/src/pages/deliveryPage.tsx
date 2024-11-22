import { useEffect, useState } from 'react';
import { Order } from '../types/orders';
import { GetAcceptedOrdersAPI } from '../api/orders';

function DeliveryPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const orders = await GetAcceptedOrdersAPI();
            setOrders(orders);
        } catch (error) {
            console.error('Error fetching Orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            {orders.length > 0 ? (
                <div>
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '20px',
                                marginBottom: '20px',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                maxWidth: '450px',
                                width: '100%',
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            <div>
                                <strong>Order ID:</strong>
                                <p>{order._id}</p>
                            </div>

                            <div>
                                <strong>Customer ID:</strong>
                                <p>{order.customerID}</p>
                            </div>

                            <div>
                                <strong>Address:</strong>
                                <p>
                                    {order.address.street}, {order.address.city}
                                    , {order.address.postalCode}
                                </p>
                            </div>

                            <div>
                                <strong>Total Price:</strong>
                                <p>${order.totalPrice.toFixed(2)}</p>
                            </div>

                            <div>
                                <strong>Timestamp:</strong>
                                <p>
                                    {new Date(order.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <h1>There are no accepted orders pending...</h1>
                    <p>Come back later to find tasks to deliver!</p>
                </>
            )}
        </div>
    );
}

export default DeliveryPage;

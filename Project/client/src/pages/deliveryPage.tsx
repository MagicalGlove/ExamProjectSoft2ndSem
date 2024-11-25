import { useEffect, useState } from 'react';
import { Order } from '../types/orders';
import { GetAcceptedOrdersAPI } from '../api/orders';

function DeliveryPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
        <div style={{ display: 'flex', gap: '20px' }}>
            {/* Order List */}
            <div style={{ flex: 1 }}>
                {orders.length > 0 ? (
                    <div>
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    marginBottom: '20px',
                                    backgroundColor: selectedOrder?._id === order._id ? '#e0f7fa' : '#f9f9f9',
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
                        ))}
                    </div>
                ) : (
                    <>
                        <h1>There are no accepted orders pending...</h1>
                        <p>Come back later to find tasks to deliver!</p>
                    </>
                )}
            </div>

            {/* Selected Order Details */}
            <div style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                {selectedOrder ? (
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
                                    {item.quantity}x {item.menuItem.name} (${item.menuItem.price.toFixed(2)})
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Select an order to view its details</p>
                )}
            </div>
        </div>
    );
}

export default DeliveryPage;

import { useEffect, useState } from 'react';
import { Order } from '../types/orders';
import { completeOrderAsDelivery, GetAcceptedOrdersAPI, GetOwnOrdersStatus } from '../api/orders';
import { User } from '../types/users';
import { useLocation } from 'react-router-dom';
import OrderCard from '../components/orders/orderCard';
import OrderCardDelivery from '../components/orders/orderCardDelivery';
import SelectedOrder from '../components/orders/selectedOrder';
import NoUser from './components/noUser';

function DeliveryPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [ownOrdersPickedUp, setOwnOrdersPickedUp] = useState<Order[]>([]);
    const [ownOrdersComplete, setOwnOrdersComplete] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const location = useLocation();
    const user: User = location.state?.user;

    const fetchOrders = async () => {
        try {
            const orders = await GetAcceptedOrdersAPI();
            const ownOrdersPickedUp = await GetOwnOrdersStatus(user._id, 3);
            const ownOrdersComplete = await GetOwnOrdersStatus(user._id, 4);
            setOrders(orders);
            setOwnOrdersPickedUp(ownOrdersPickedUp);
            setOwnOrdersComplete(ownOrdersComplete);
        } catch (error) {
            console.error('Error fetching Orders:', error);
        }
    };

    async function handleCompleteOrder(orderID: string) {
        try {
            await completeOrderAsDelivery(orderID);

            fetchOrders();
            setSelectedOrder(null);
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    }

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (!user) return <NoUser />;

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Order List */}
                <div style={{ flex: 1 }}>
                    {orders.length > 0 ? (
                        <div>
                            {orders.map((order) => (
                                <OrderCardDelivery
                                    key={order.userID}
                                    order={order}
                                    selectedOrderID={selectedOrder?.userID}
                                    setSelectedOrder={setSelectedOrder}
                                />
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
                <div
                    style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                    }}
                >
                    {selectedOrder ? (
                        <SelectedOrder
                            selectedOrder={selectedOrder}
                            fetchOrders={fetchOrders}
                            userID={user._id}
                            setSelectedOrder={setSelectedOrder}
                        />
                    ) : (
                        <p>Select an order to view its details</p>
                    )}
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ padding: '10px' }}>
                    <h1 style={{ textAlign: 'center' }}>Your current orders:</h1>
                    {ownOrdersPickedUp.map((ownOrder) => (
                        <OrderCard key={ownOrder.userID} order={ownOrder}>
                            <button onClick={() => handleCompleteOrder(ownOrder.userID)}>Complete</button>
                        </OrderCard>
                    ))}
                </div>
                <div style={{ padding: '10px' }}>
                    <h1 style={{ textAlign: 'center' }}>Your completed orders:</h1>
                    {ownOrdersComplete.map((ownOrder) => (
                        <OrderCard
                            key={ownOrder.userID}
                            order={ownOrder}
                            setSelectedOrder={setSelectedOrder}
                        ></OrderCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DeliveryPage;

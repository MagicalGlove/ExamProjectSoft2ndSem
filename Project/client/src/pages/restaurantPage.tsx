import { useEffect, useState } from 'react';
import { Order } from '../types/orders';
import { GetOrdersAPIByRestaurantID } from '../api/orders';
import { useLocation } from 'react-router-dom';
import { User } from '../types/users';
import { LineChart } from '@mui/x-charts';
import { orderCountToLineChartSeries, orderIncomeToLineChartSeries } from '../chartFunctions/linechart.ts';
import OrderCard from '../components/orders/orderCard.tsx';
import OrderCardDetailed from '../components/orders/orderCardDetailed.tsx';
import { OrderStatusEnum } from '../utilities/orders.ts';
import { Divider } from '@mui/material';
import NoUser from './components/noUser.tsx';

function RestaurantPage() {
    const location = useLocation();
    const user: User = location.state?.user;

    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [yData, setYData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [labelType, setLabelType] = useState<string>('Income');

    const fetchOrders = async () => {
        try {
            if (!user.restaurant) return;
            const orders = await GetOrdersAPIByRestaurantID(user.restaurant);
            setOrders(orders);

            if (labels.length == 0 && yData.length == 0) {
                setLabelType('Income');
                setLabelType('Order count');
                const series = orderCountToLineChartSeries(orders);
                const y: number[] = [];
                const labels: string[] = [];

                series.forEach((l) => {
                    y.push(l.y);
                    labels.push(l.label);
                });

                setYData(y);
                setLabels(labels);
            }
        } catch (error) {
            console.error('Error fetching Orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function filterOrders(orders: Order[], statuses: number[]): Order[] {
        return orders.filter((order) => statuses.includes(order.status));
    }

    if (!user) return <NoUser />;

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        if (labelType == 'Income') {
                            setLabelType('Order count');
                            const series = orderCountToLineChartSeries(orders);
                            const y: number[] = [];
                            const labels: string[] = [];

                            series.forEach((l) => {
                                y.push(l.y);
                                labels.push(l.label);
                            });

                            setYData(y);
                            setLabels(labels);
                        } else if (labelType == 'Order count') {
                            setLabelType('Income');
                            const series = orderIncomeToLineChartSeries(orders);
                            const y: number[] = [];
                            const labels: string[] = [];

                            series.forEach((l) => {
                                y.push(l.y);
                                labels.push(l.label);
                            });

                            setYData(y);
                            setLabels(labels);
                        }
                    }}
                >
                    {labelType == 'Income' ? 'Show Order count' : 'Show Income'}
                </button>
                <LineChart
                    xAxis={[
                        {
                            scaleType: 'point',
                            data: labels,
                            label: labelType,
                        },
                    ]}
                    series={[
                        {
                            data: yData,
                            area: true,
                        },
                    ]}
                    height={400}
                />
            </div>
            {orders.length > 0 ? (
                <>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                        }}
                    >
                        <div
                            style={{
                                padding: '20px',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderStyle: 'solid',
                            }}
                        >
                            <h1 style={{ textAlign: 'center' }}>Waiting for evaluation</h1>
                            <Divider />
                            <div
                                style={{
                                    padding: '20px',
                                    maxHeight: '100vh',
                                    overflowY: 'auto',
                                }}
                            >
                                {filterOrders(orders, [OrderStatusEnum.Created]).map((order) => (
                                    <OrderCard key={order.userID} order={order} setSelectedOrder={setSelectedOrder} />
                                ))}
                            </div>
                        </div>
                        <div
                            style={{
                                padding: '20px',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderStyle: 'solid',
                            }}
                        >
                            <h1 style={{ textAlign: 'center' }}>Accepted - on the way</h1>
                            <Divider />
                            <div
                                style={{
                                    padding: '20px',
                                    maxHeight: '100vh',
                                    overflowY: 'auto',
                                }}
                            >
                                {filterOrders(orders, [OrderStatusEnum.Accepted, OrderStatusEnum.OnItsWay]).map(
                                    (order) => (
                                        <OrderCard
                                            key={order.userID}
                                            order={order}
                                            setSelectedOrder={setSelectedOrder}
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <div
                            style={{
                                padding: '20px',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderStyle: 'solid',
                            }}
                        >
                            <h1 style={{ textAlign: 'center' }}>Completed or rejected</h1>
                            <Divider />
                            <div
                                style={{
                                    padding: '20px',
                                    maxHeight: '100vh',
                                    overflowY: 'auto',
                                }}
                            >
                                {filterOrders(orders, [OrderStatusEnum.Complete, OrderStatusEnum.Rejected]).map(
                                    (order) => (
                                        <OrderCard
                                            key={order.userID}
                                            order={order}
                                            setSelectedOrder={setSelectedOrder}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                padding: '20px',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderStyle: 'solid',
                            }}
                        >
                            <h1 style={{ textAlign: 'center' }}>Evaluation</h1>
                            <Divider />

                            {selectedOrder && (
                                <OrderCardDetailed selectedOrder={selectedOrder} fetchOrders={fetchOrders} />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1>There are no accepted orders pending...</h1>
                    <p>Come back later to find tasks to deliver!</p>
                </>
            )}
        </div>
    );
}

export default RestaurantPage;

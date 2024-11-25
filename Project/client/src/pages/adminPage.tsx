import { PieChart, LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { GetOrdersAPI } from '../api/orders.ts';
import { LineData, PerRestaurantsData } from '../types/chartSerieData.ts';
import { GetRestaurantsAPI } from '../api/restaurants.ts';
import {
    ordersToCountChartSeries,
    ordersToIncomeChartSeriesPerRestaurant,
} from '../chartFunctions/piechart.ts';
import { updateLineChartCount, updateLineChartIncome } from '../chartFunctions/linechart.ts';
import { Order } from '../types/orders.ts';

function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderCount, setOrderCount] = useState<PerRestaurantsData[]>([]);
    const [incomeCount, setIncomeCount] = useState<PerRestaurantsData[]>([]);
    const [yData, setYData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [labelType, setLabelType] = useState<string>();

    const fetch = async () => {
        try {
            const orders = await GetOrdersAPI();
            const restaurants = await GetRestaurantsAPI();
            setOrders(orders);
            setOrderCount(ordersToCountChartSeries(orders, restaurants));
            setIncomeCount(ordersToIncomeChartSeriesPerRestaurant(orders, restaurants));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetch();
    });

    return (
        <div>
            admin
            <div>
                <PieChart
                    series={[
                        {
                            data: orderCount,
                            innerRadius: 10,
                        },
                    ]}
                    width={700}
                    height={400}
                    onItemClick={(event, d) => {
                        const series = updateLineChartCount(d.dataIndex, incomeCount, orders);
                        const x: number[] = [];
                        const y: number[] = [];
                        const label: string[] = [];
                        series.forEach(line => {
                            x.push(line.x);
                            y.push(line.y);
                            label.push(line.label);
                        });
                        setYData(y);
                        setLabels(labels);
                        setLabelType("Order count over time for " + incomeCount[d.dataIndex].label.toString())
                    }}
                />
                <PieChart
                    series={[
                        {
                            data: incomeCount,
                            innerRadius: 10,
                        },
                    ]}
                    width={700}
                    height={400}
                    onItemClick={(event, d) => {
                        const series = updateLineChartIncome(d.dataIndex, incomeCount, orders);
                        const x: number[] = [];
                        const y: number[] = [];
                        const label: string[] = [];
                        series.forEach(line => {
                            x.push(line.x);
                            y.push(line.y);
                            label.push(line.label);
                        });
                        setYData(y);
                        setLabels(label);
                        setLabelType("Income over time for " + incomeCount[d.dataIndex].label.toString());
                    }}
                />
            </div>
            <div>
                <LineChart
                    xAxis={[{
                        scaleType: 'point',
                        data: labels,
                        label: labelType
                    }]}
                    series={[
                        {
                            data: yData,
                            area: true,
                        },
                    ]}
                    height={300}
                />
            </div>
        </div>
    );
}

export default AdminPage;

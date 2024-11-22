import { PieItemIdentifier } from '@mui/x-charts';
import { LineData, PerRestaurantsData } from '../types/chartSerieData';
import { Order } from '../types/orders';

export const updateLineChartIncome = (
    input: number,
    data: PerRestaurantsData[],
    orders: Order[]) => {

    if (input < 0 || input >= data.length) {
        return [];
    }

    const id = data[input].id;
    const result: LineData[] = [];

    orders.forEach(order => {
        if (order.restaurantID == id) {
            const date = new Date(order.timestamp);
            const xDate = Math.floor(date.getTime() / 86400000 / 7);
            let found = false;

            result.forEach((r) => {
                if (r.x == xDate) {
                    found = true;
                    r.y += order.totalPrice;
                }
            });

            if (!found) {
                result.push({
                    x: xDate,
                    y: order.totalPrice,
                    label: (date.getUTCFullYear()) + ' / ' + ((Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 86400000 / 7) + 1)),
                });
            }
        }
    });

    return result.sort(l => -l.x);
};

export const updateLineChartCount = (
    input: number,
    data: PerRestaurantsData[],
    orders: Order[]) => {

    if (input < 0 || input >= data.length) {
        return [];
    }

    const id = data[input].id;
    const result: LineData[] = [];

    orders.forEach(order => {
        if (order.restaurantID == id) {
            const date = new Date(order.timestamp);
            const xDate = Math.floor(date.getTime() / 86400000 / 7);
            let found = false;

            result.forEach((r) => {
                if (r.x == xDate) {
                    found = true;
                    r.y += 1;
                }
            });

            if (!found) {
                result.push({
                    x: xDate,
                    y: 1,
                    label: (date.getUTCFullYear()) + ' / ' + ((Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 86400000 / 7) + 1)),
                });
            }
        }
    });

    return result.sort(l => -l.x);
};
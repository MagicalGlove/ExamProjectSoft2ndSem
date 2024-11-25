import { Restaurant } from '../types/restaurants';
import { Order } from '../types/orders';
import { ordersToCountChartSeries, ordersToIncomeChartSeriesPerRestaurant } from '../chartFunctions/piechart';
import {
    orderCountToLineChartSeries,
    orderIncomeToLineChartSeries,
    updateLineChartCount,
    updateLineChartIncome,
} from '../chartFunctions/linechart';

describe('Total orders per restaurant to data series', () => {
    const restaurants: Restaurant[] = [
        {
            _id: '1',
            name: 'res1',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
        {
            _id: '2',
            name: 'res2',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
    ];
    const orders: Order[] = [
        {
            _id: '1',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 50,
            feedbackID: '',
            timestamp: '2024-11-20T12:00:00.000Z',
            orderItemList: [],
        },
        {
            _id: '2',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 80,
            feedbackID: '',
            timestamp: '2024-11-20T12:00:00.000Z',
            orderItemList: [],
        },
        {
            _id: '3',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '2',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 30,
            feedbackID: '',
            timestamp: '2024-11-20T12:00:00.000Z',
            orderItemList: [],
        },
    ];
    const ordersSingleRestaurant: Order[] = [
        {
            _id: '1',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 50,
            feedbackID: '',
            timestamp: '2024-11-20T12:00:00.000Z',
            orderItemList: [],
        },
        {
            _id: '2',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 80,
            feedbackID: '',
            timestamp: '2024-11-20T12:00:00.000Z',
            orderItemList: [],
        },
    ];

    it('Should return equal as expected result', () => {
        const expectedResult = [
            { id: '1', value: 2, label: 'res1' },
            { id: '2', value: 1, label: 'res2' },
        ];
        const result = ordersToCountChartSeries(orders, restaurants);
        expect(result).toEqual(expectedResult);
    });

    it('Should return equal as expected result', () => {
        const expectedResult = [
            {
                label: '2024 / 47',
                x: 2863,
                y: 2,
            }];

        const result = orderCountToLineChartSeries(ordersSingleRestaurant);
        console.log(result);
        expect(result).toEqual(expectedResult);
    });

    it('Should return empty if orders array is empty', () => {
        const expectedResult = [];

        const result = orderCountToLineChartSeries([]);
        console.log(result);
        expect(result).toEqual(expectedResult);
    });
});

describe('Total orders income per restaurant to data series', () => {
    const restaurants: Restaurant[] = [
        {
            _id: '1',
            name: 'res1',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
        {
            _id: '2',
            name: 'res2',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
    ];
    const orders: Order[] = [
        {
            _id: '1',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 50,
            feedbackID: '',
            timestamp: '',
            orderItemList: [],
        },
        {
            _id: '2',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 80,
            feedbackID: '',
            timestamp: '',
            orderItemList: [],
        },
        {
            _id: '3',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '2',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 30,
            feedbackID: '',
            timestamp: '',
            orderItemList: [],
        },
    ];
    const ordersSingleRestaurant: Order[] = [
        {
            _id: '1',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 50,
            feedbackID: '',
            timestamp: '2024-11-20T12:00:00.000Z',
            orderItemList: [],
        },
        {
            _id: '2',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 80,
            feedbackID: '',
            timestamp: '2024-11-20T12:00:00.000Z',
            orderItemList: [],
        },
    ];

    const expectedResult = [
        { id: '1', value: 130, label: 'res1' },
        { id: '2', value: 30, label: 'res2' },
    ];

    it('Should return equal as expected result', () => {
        const result = ordersToIncomeChartSeriesPerRestaurant(orders, restaurants);
        expect(result).toEqual(expectedResult);
    });

    it('Should return equal as expected result', () => {
        const result = ordersToIncomeChartSeriesPerRestaurant(orders, restaurants);
        expect(result).toEqual(expectedResult);
    });

    it('Should return equal as expected result', () => {
        const expectedResult = [
            {
                label: '2024 / 47',
                x: 2863,
                y: 130,
            }];

        const result = orderIncomeToLineChartSeries(ordersSingleRestaurant);
        console.log(result);
        expect(result).toEqual(expectedResult);
    });

    it('Should return empty if orders array is empty', () => {
        const expectedResult = [];

        const result = orderIncomeToLineChartSeries([]);
        console.log(result);
        expect(result).toEqual(expectedResult);
    });
});

describe('PieChart series to LineChart series', () => {
    const restaurants: Restaurant[] = [
        {
            _id: '1',
            name: 'res1',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
        {
            _id: '2',
            name: 'res2',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
    ];
    const orders: Order[] = [
        {
            _id: '1',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 50,
            feedbackID: '',
            timestamp: '2024-11-20T12:00:00.000Z',
            orderItemList: [],
        },
        {
            _id: '2',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 80,
            feedbackID: '',
            timestamp: '2024-11-20T12:00:00.000Z',
            orderItemList: [],
        },
        {
            _id: '3',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 30,
            feedbackID: '',
            timestamp: '2024-11-10T12:00:00.000Z',
            orderItemList: [],
        },
    ];
    const series = ordersToIncomeChartSeriesPerRestaurant(orders, restaurants);

    it('Should return equal as expected result with income as y value', () => {
        const expectedResult = [
            { x: 2863, y: 130, label: '2024 / 47' },
            { x: 2862, y: 30, label: '2024 / 45' },
        ];

        const result = updateLineChartIncome(0, series, orders);
        expect(result).toEqual(expectedResult);
    });

    it('Should return empty array if index is greater then series data', () => {
        const expectedResult = [];

        const result = updateLineChartIncome(2, series, orders);
        expect(result).toEqual(expectedResult);
    });

    it('Should return equal as expected result with order count as y value', () => {
        const expectedResult = [
            { x: 2863, y: 2, label: '2024 / 47' },
            { x: 2862, y: 1, label: '2024 / 45' },
        ];

        const result = updateLineChartCount(0, series, orders);
        expect(result).toEqual(expectedResult);
    });

    it('Should return empty array if index is greater then series data', () => {
        const expectedResult = [];

        const result = updateLineChartCount(2, series, orders);
        expect(result).toEqual(expectedResult);
    });
});
import { calculateDeliveryPay } from '../../../utilities/order.ts';

jest.mock('../../../RestaurantService/dbFunctions');

describe('Utility functions tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('calculates the deliveree pay correctly', async () => {
        const pay = {
            baseAmount: 5,
            totalOrderQuantityMultiplier: 1.1,
            deliverySpeedMultiplier: 1.3,
            feedbackRatingMultiplier: 1.05,
            orderPriceBonus: 0.56,
            nightTimeBonus: 2.5,
            totalPay: 0,
        };

        const delivereePay = calculateDeliveryPay(pay);

        expect(delivereePay).not.toBeNull();
        expect(delivereePay).toBe(10.57);
    });

    it('calculates the deliveree pay correctly', async () => {
        const pay = {
            baseAmount: 5,
            totalOrderQuantityMultiplier: null,
            deliverySpeedMultiplier: null,
            feedbackRatingMultiplier: null,
            orderPriceBonus: 0.56,
            nightTimeBonus: 2.5,
            totalPay: 0,
        };

        const delivereePay = calculateDeliveryPay(pay);

        expect(delivereePay).not.toBeNull();
        expect(delivereePay).toBe(8.06);
    });
});

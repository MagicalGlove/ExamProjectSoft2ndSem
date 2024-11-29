import { DelivereePayment } from '../monolithOrderAndFeedback/types/order.ts';

export function calculateDeliveryPay(pay: DelivereePayment): number {
    const salary =
        pay.baseAmount *
            (pay.deliverySpeedMultiplier || 1) *
            (pay.feedbackRatingMultiplier || 1) *
            (pay.totalOrderQuantityMultiplier || 1) +
        pay.nightTimeBonus +
        pay.orderPriceBonus;

    return Number(salary.toFixed(2));
}

import { ObjectId } from 'mongodb';

export interface OrderData {
    customerID: ObjectId;
    restaurantID: ObjectId;
    address: ObjectId;
    totalPrice: number;
    orderItemList: OrderItem[];
    timestamp: Date;
    // status: string;
}

export interface OrderItem {
    menuItemId: ObjectId;
    quantity: number;
}

export interface DelivereePayment {
    // Multipliers shall ALWAYS be above 1. The mutiplied  is supposed to be multiplied with the amount, not added to. So 100 (price) * 1.2 (multiplier) = 120 (total)
    baseAmount: number;
    totalOrderQuantityMultiplier: number | null;
    deliverySpeedMultiplier: number | null;
    feedbackRatingMultiplier: number | null;
    orderPriceBonus: number;
    nightTimeBonus: number;
    totalPay: number;
}

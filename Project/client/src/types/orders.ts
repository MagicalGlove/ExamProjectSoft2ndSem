import { Address } from './address';
export interface Order {
    _id: string;
    customerID: Customer;
    restaurantID: string;
    employeeID: string;
    status: number;
    address: Address;
    totalPrice: number;
    feedbackID: string;
    timestamp: string;
    orderItemList: OrderItem[];
    pickUpDate?: string;
    completionDate?: string;
    rejectReason?: string;
    pay?: DelivereePayment;
}


export interface Customer {
    _id: string;
    username: string;
    password: string;
    role: string;
    address: string;
    phoneNumber?: number;
}

export interface OrderItem {
    menuItem: MenuItem;
    quantity: number;
}

export interface MenuItem {
    _id: string;
    name: string;
    price: number;
    availability: boolean;
}

export interface FeedbackCollection {
    orderId: string;
    foodRating: number | null;
    overallRating: number | null;
    deliveryRating: number | null;
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

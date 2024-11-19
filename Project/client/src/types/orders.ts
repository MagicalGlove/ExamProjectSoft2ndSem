export interface Order {
    _id: string;
    customerID: Customer;
    restaurantID: string;
    status: number;
    address: Address;
    totalPrice: number;
    feedbackID: string;
    timestamp: string;
    orderItemList: string[];
}

export interface Address {
    _id: string;
    street: string;
    city: string;
    postalCode: number;
}

export interface Customer {
    _id: string;
    username: string;
    password: string;
    role: string;
    address: string;
    phoneNumber?: number;
}

export interface Order {
    _id: string;
    customerID: Customer;
    restaurantID: string;
    status: number;
    address: Address;
    totalPrice: number;
    feedbackID: string;
    timestamp: string;
    orderItemList: OrderItem[];
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

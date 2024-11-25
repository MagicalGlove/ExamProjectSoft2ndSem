import { Address } from './orders.ts';

export interface MenuItem {
    _id: string;
    name: string;
    price: number;
    availability: boolean;
}

export interface Restaurant {
    _id: string;
    name: string;
    address: Address;
    menu: MenuItem[];
}

export interface Address {
    _id: string;
    street: string;
    city: string;
    postalCode: string;
}



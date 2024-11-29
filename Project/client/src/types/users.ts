import { Address} from "./address";

export enum USER_ROLES {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    DELIVERY = 'delivery',
    RESTAURANT = 'restaurant',
}

export interface User {
    _id: string;
    username: string;
    password: string;
    role: USER_ROLES;
    address: string | Address;
    restaurant?: string;
    phoneNumber?: number;
}

export interface Credentials {
    username: string;
    password: string;
}

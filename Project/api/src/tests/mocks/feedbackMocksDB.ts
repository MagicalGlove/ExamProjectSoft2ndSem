import { ObjectId } from "mongodb";

export const mockOrderItemListDB = [{menuItemId: new ObjectId(), quantity: 2}, {menuItemId: new ObjectId(), quantity: 3}, {menuItemId: new ObjectId(), quantity: 1}]

export const mockOrderDB = {
    customerID: new ObjectId(),
    restaurantID: new ObjectId(),
    address: new ObjectId(),
    totalPrice: 50,
    menuItems: mockOrderItemListDB,
    timestamp: new Date(),
};

export const mockUpdateResultDB = {
    affected: 0,
    raw: {},
    generatedMaps: [],
};
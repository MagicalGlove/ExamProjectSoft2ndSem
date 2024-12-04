import { ObjectId } from 'mongodb';

export const getAllOrdersMockOrder1 = {
    customerID: new ObjectId('672df427f54107237ff75565'),
    restaurantID: new ObjectId('672de88ff54107237ff75565'),
    address: new ObjectId('672df723f54107237ff75573'),
    totalPrice: 50,
    orderItemList: [
        {
            menuItemId: new ObjectId('672de8c4f54107237ff75546'),
            quantity: 2,
        },
        {
            menuItemId: new ObjectId('672de8c4f54107237ff75547'),
            quantity: 3,
        },
        {
            menuItemId: new ObjectId('672de8c4f54107237ff75548'),
            quantity: 1,
        },
    ],
    timestamp: new Date('2024-11-20T12:00:00.000Z'),
    employeeID: '672df427f54107237ff75569',
    status: 2,

    feedbackID: null,
};
export const getAllOrdersMockOrder2 = {
    customerID: new ObjectId('672df427f54107237ff75565'),
    restaurantID: new ObjectId('672de88ff54107237ff75565'),
    address: new ObjectId('672df723f54107237ff75573'),
    totalPrice: 50,
    orderItemList: [
        {
            menuItemId: new ObjectId('672de8c4f54107237ff75546'),
            quantity: 2,
        },
        {
            menuItemId: new ObjectId('672de8c4f54107237ff75547'),
            quantity: 3,
        },
        {
            menuItemId: new ObjectId('672de8c4f54107237ff75548'),
            quantity: 1,
        },
    ],
    timestamp: new Date('2024-11-20T12:00:00.000Z'),
    employeeID: '672df427f54107237ff75569',
    status: 2,

    feedbackID: null,
};

export const mockOrder = {
    customerID: new ObjectId(),
    restaurantID: new ObjectId(),
    employeeID: new ObjectId('672df427f54107237ff75569'), // Same `employeeID` for filtering
    status: 4,
    address: new ObjectId(),
    totalPrice: Math.random() * 100,
    orderItemList: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
        menuItemId: new ObjectId(),
        quantity: Math.floor(Math.random() * 5) + 1,
    })),
    feedbackID: new ObjectId(),
    timestamp: new Date(),
    pickUpDate: new Date(),
    completionDate: new Date(),
    pay: {
        baseAmount: Math.random() * 10,
        totalOrderQuantityMultiplier: Math.random() * 2,
        deliverySpeedMultiplier: Math.random() * 2,
        feedbackRatingMultiplier: Math.random(),
        orderPriceBonus: Math.random(),
        nightTimeBonus: Math.random(),
        totalPay: Math.random() * 100,
    },
    rejectReason: null,
};

export const mockOrderWithId = {
    _id: new ObjectId(),
    customerID: new ObjectId(),
    restaurantID: new ObjectId(),
    employeeID: new ObjectId('672df427f54107237ff75569'), // Same `employeeID` for filtering
    status: 4,
    address: new ObjectId(),
    totalPrice: Math.random() * 100,
    orderItemList: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
        menuItemId: new ObjectId(),
        quantity: Math.floor(Math.random() * 5) + 1,
    })),
    feedbackID: new ObjectId(),
    timestamp: new Date(),
    pickUpDate: new Date(),
    completionDate: new Date(),
    pay: {
        baseAmount: Math.random() * 10,
        totalOrderQuantityMultiplier: Math.random() * 2,
        deliverySpeedMultiplier: Math.random() * 2,
        feedbackRatingMultiplier: Math.random(),
        orderPriceBonus: Math.random(),
        nightTimeBonus: Math.random(),
        totalPay: Math.random() * 100,
    },
    rejectReason: null,
};

export const mockOrderCreate = {
    _id: new ObjectId('673de997fa60e0a917658708'),
    customerID: new ObjectId('672df427f54107237ff75565'),
    restaurantID: new ObjectId('672de88ff54107237ff75565'),
    address: new ObjectId('672df723f54107237ff75573'),
    totalPrice: 50,
    orderItemList: [
        {
            menuItemId: new ObjectId('672de8c4f54107237ff75546'),
            quantity: 2,
        },
        {
            menuItemId: new ObjectId('672de8c4f54107237ff75547'),
            quantity: 3,
        },
        {
            menuItemId: new ObjectId('672de8c4f54107237ff75548'),
            quantity: 1,
        },
    ],
    timestamp: new Date('2024-11-20T12:00:00.000Z'),
    employeeID: null,
    feedbackID: null,
};

export const getAllOrdersMockOrderArray = [getAllOrdersMockOrder1, getAllOrdersMockOrder2];

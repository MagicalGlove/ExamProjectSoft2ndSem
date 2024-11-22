import { ObjectId } from 'mongodb';

export const mockOrder = {
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

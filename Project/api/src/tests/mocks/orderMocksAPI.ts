const timestamp = new Date();

const mockOrderItemList = [
    { menuItemId: 'someObjectId', quantity: 2 },
    { menuItemId: 'someObjectId', quantity: 3 },
    { menuItemId: 'someObjectId', quantity: 1 },
];

export const mockOrderAPI = {
    _id: 'someObjectId',
    userID: 1,
    restaurantID: 2324,
    menuItems: mockOrderItemList,
    address: 11,
    totalPrice: 50,
    timestamp: timestamp.toISOString(),
    status: 1,
};

export const mockOrderPayloadAPI = {
    userID: 1,
    restaurantID: 2324,
    menuItems: mockOrderItemList,
    address: 11,
    totalPrice: 50,
    timestamp: timestamp,
};

export const mockOrderRejectAPI = {
    _id: 'someObjectId',
    userID: 1,
    restaurantID: 2324,
    menuItems: mockOrderItemList,
    address: 11,
    totalPrice: 50,
    timestamp: timestamp.toISOString(),
    status: 1,
    rejectReason: "Manden bor i indien, der leverer vi skam ik' til",
};

export const mockOrderListAPI = [
    {
        userID: 1,
        restaurantID: 2324,
        menuItems: mockOrderItemList,
        address: 11,
        totalPrice: 50,
        timestamp: timestamp.toISOString(),
        status: 2,
    },
    {
        userID: 1,
        restaurantID: 2324,
        menuItems: mockOrderItemList,
        address: 11,
        totalPrice: 50,
        timestamp: timestamp.toISOString(),
        status: 1,
    },
];

export const mockAcceptAsDelivery = {
    _id: '67412feda778184dc774ecf7',
    customerID: '672df427f54107237ff75565',
    restaurantID: '672de88ff54107237ff75565',
    status: 3,
    address: '672df723f54107237ff75573',
    totalPrice: 30,
    orderItemList: [
        {
            menuItemId: '672de8c4f54107237ff75546',
            quantity: 2,
        },
        {
            menuItemId: '672de8c4f54107237ff75548',
            quantity: 1,
        },
    ],
    timestamp: '2024-11-20T12:00:00.000Z',
    rejectReason: null,
    employeeID: '672df427f54107237ff75569',
    feedbackID: null,
};

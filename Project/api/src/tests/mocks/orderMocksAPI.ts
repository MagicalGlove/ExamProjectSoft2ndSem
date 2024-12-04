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

export const mockCompleteAsDelivery = {
    _id: '67412feda778184dc774ecf7',
    customerID: '672df427f54107237ff75565',
    restaurantID: '672de88ff54107237ff75565',
    status: 4,
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

export const mockOrdersByIDArray = [
    {
        _id: '673de997fa60e0a917658809',
        customerID: {
            _id: '672df427f54107237ff75565',
            username: 'Abejægeren',
            password: 'test123',
            role: 'customer',
            address: '672df794f54107237ff75575',
            phoneNumber: '52361743',
        },
        restaurantID: '672de88ff54107237ff75565',
        employeeID: '672df427f54107237ff75569',
        status: 4,
        address: {
            _id: '672df723f54107237ff75573',
            street: 'Maple Street 12',
            city: 'Copenhagen',
            postalCode: '1001',
        },
        totalPrice: 51,
        orderItemList: [
            {
                menuItemId: '672de8c4f54107237ff75546',
                quantity: 2,
                menuItem: {
                    _id: '672de8c4f54107237ff75546',
                    name: 'Chilly Cheeze Tops',
                    price: 19.99,
                    availability: true,
                },
            },
            {
                menuItemId: '672de8c4f54107237ff75547',
                quantity: 3,
                menuItem: {
                    _id: '672de8c4f54107237ff75547',
                    name: 'Chicken nuggets',
                    price: 6.99,
                    availability: true,
                },
            },
            {
                menuItemId: '672de8c4f54107237ff75548',
                quantity: 1,
                menuItem: {
                    _id: '672de8c4f54107237ff75548',
                    name: 'Whopper Stopper without rubber',
                    price: 39.99,
                    availability: true,
                },
            },
        ],
        feedbackID: '6746f808811bc399c18d6c26',
        timestamp: '2024-11-20T12:00:00.000Z',
        pickUpDate: '2024-11-27T09:45:47.140Z',
        completionDate: '2024-11-27T09:45:48.722Z',
        pay: {
            baseAmount: 5,
            totalOrderQuantityMultiplier: 1.013,
            deliverySpeedMultiplier: 1.2,
            feedbackRatingMultiplier: 0,
            orderPriceBonus: 0.51,
            nightTimeBonus: 0,
            totalPay: 6.59,
        },
        rejectReason: null,
    },
    {
        _id: '67412feda778184dc774ecf7',
        customerID: {
            _id: '672df427f54107237ff75565',
            username: 'Abejægeren',
            password: 'test123',
            role: 'customer',
            address: '672df794f54107237ff75575',
            phoneNumber: '52361743',
        },
        restaurantID: '672de88ff54107237ff75565',
        employeeID: '672df427f54107237ff75569',
        status: 4,
        address: {
            _id: '672df723f54107237ff75573',
            street: 'Maple Street 12',
            city: 'Copenhagen',
            postalCode: '1001',
        },
        totalPrice: 30,
        orderItemList: [
            {
                menuItemId: '672de8c4f54107237ff75546',
                quantity: 2,
                menuItem: {
                    _id: '672de8c4f54107237ff75546',
                    name: 'Chilly Cheeze Tops',
                    price: 19.99,
                    availability: true,
                },
            },
            {
                menuItemId: '672de8c4f54107237ff75548',
                quantity: 1,
                menuItem: {
                    _id: '672de8c4f54107237ff75548',
                    name: 'Whopper Stopper without rubber',
                    price: 39.99,
                    availability: true,
                },
            },
        ],
        timestamp: '2024-11-20T12:00:00.000Z',
        pickUpDate: '2024-11-27T09:18:50.731Z',
        completionDate: '2024-11-27T09:43:05.959Z',
        pay: {
            baseAmount: 5,
            totalOrderQuantityMultiplier: 1.013,
            deliverySpeedMultiplier: 1.2,
            feedbackRatingMultiplier: 0,
            orderPriceBonus: 0.3,
            nightTimeBonus: 0,
            totalPay: 6.38,
        },
        rejectReason: null,
    },
];

export const mockOrdersByEmployeeAndStatusArr = [
    {
        _id: '673de997fa60e0a917658809',
        customerID: {
            _id: '672df427f54107237ff75565',
            username: 'Abejægeren',
            password: 'test123',
            role: 'customer',
            address: '672df794f54107237ff75575',
            phoneNumber: '52361743',
        },
        restaurantID: '672de88ff54107237ff75565',
        employeeID: '672df427f54107237ff75569',
        status: 3,
        address: {
            _id: '672df723f54107237ff75573',
            street: 'Maple Street 12',
            city: 'Copenhagen',
            postalCode: '1001',
        },
        totalPrice: 51,
        orderItemList: [
            {
                menuItemId: '672de8c4f54107237ff75546',
                quantity: 2,
                menuItem: {
                    _id: '672de8c4f54107237ff75546',
                    name: 'Chilly Cheeze Tops',
                    price: 19.99,
                    availability: true,
                },
            },
            {
                menuItemId: '672de8c4f54107237ff75547',
                quantity: 3,
                menuItem: {
                    _id: '672de8c4f54107237ff75547',
                    name: 'Chicken nuggets',
                    price: 6.99,
                    availability: true,
                },
            },
            {
                menuItemId: '672de8c4f54107237ff75548',
                quantity: 1,
                menuItem: {
                    _id: '672de8c4f54107237ff75548',
                    name: 'Whopper Stopper without rubber',
                    price: 39.99,
                    availability: true,
                },
            },
        ],
        feedbackID: '6746f808811bc399c18d6c26',
        timestamp: '2024-11-20T12:00:00.000Z',
        pickUpDate: '2024-11-27T09:45:47.140Z',
        completionDate: '2024-11-27T09:45:48.722Z',
        pay: {
            baseAmount: 5,
            totalOrderQuantityMultiplier: 1.013,
            deliverySpeedMultiplier: 1.2,
            feedbackRatingMultiplier: 0,
            orderPriceBonus: 0.51,
            nightTimeBonus: 0,
            totalPay: 6.59,
        },
        rejectReason: null,
    },
    {
        _id: '67412feda778184dc774ecf7',
        customerID: {
            _id: '672df427f54107237ff75565',
            username: 'Abejægeren',
            password: 'test123',
            role: 'customer',
            address: '672df794f54107237ff75575',
            phoneNumber: '52361743',
        },
        restaurantID: '672de88ff54107237ff75565',
        employeeID: '672df427f54107237ff75569',
        status: 3,
        address: {
            _id: '672df723f54107237ff75573',
            street: 'Maple Street 12',
            city: 'Copenhagen',
            postalCode: '1001',
        },
        totalPrice: 30,
        orderItemList: [
            {
                menuItemId: '672de8c4f54107237ff75546',
                quantity: 2,
                menuItem: {
                    _id: '672de8c4f54107237ff75546',
                    name: 'Chilly Cheeze Tops',
                    price: 19.99,
                    availability: true,
                },
            },
            {
                menuItemId: '672de8c4f54107237ff75548',
                quantity: 1,
                menuItem: {
                    _id: '672de8c4f54107237ff75548',
                    name: 'Whopper Stopper without rubber',
                    price: 39.99,
                    availability: true,
                },
            },
        ],
        timestamp: '2024-11-20T12:00:00.000Z',
        pickUpDate: '2024-11-27T09:18:50.731Z',
        completionDate: '2024-11-27T09:43:05.959Z',
        pay: {
            baseAmount: 5,
            totalOrderQuantityMultiplier: 1.013,
            deliverySpeedMultiplier: 1.2,
            feedbackRatingMultiplier: 0,
            orderPriceBonus: 0.3,
            nightTimeBonus: 0,
            totalPay: 6.38,
        },
        rejectReason: null,
    },
];

export const calcAndUpdatedOrder = {
    _id: '673de997fa60e0a917658809',
    customerID: '672df427f54107237ff75565',
    restaurantID: '672de88ff54107237ff75565',
    employeeID: '672df427f54107237ff75569',
    status: 4,
    address: '672df723f54107237ff75573',
    totalPrice: 51,
    orderItemList: [
        {
            menuItemId: '672de8c4f54107237ff75546',
            quantity: 2,
        },
        {
            menuItemId: '672de8c4f54107237ff75547',
            quantity: 3,
        },
        {
            menuItemId: '672de8c4f54107237ff75548',
            quantity: 1,
        },
    ],
    feedbackID: '6746f808811bc399c18d6c26',
    timestamp: '2024-11-20T12:00:00.000Z',
    pickUpDate: '2024-11-27T09:45:47.140Z',
    completionDate: '2024-11-27T09:45:48.722Z',
    pay: {
        baseAmount: 5,
        totalOrderQuantityMultiplier: 1.013,
        deliverySpeedMultiplier: 1.2,
        feedbackRatingMultiplier: 0,
        orderPriceBonus: 0.51,
        nightTimeBonus: 0,
        totalPay: 6.59,
    },
    rejectReason: null,
};

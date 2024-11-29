
export const acceptedOrdersMock = {
    _id: '673de997fa60e0a917658809',
    customerID: '672df427f54107237ff75565',
    restaurantID: '672de88ff54107237ff75565',
    status: 2,
    address: {
        _id: '672df723f54107237ff75573',
        street: 'Maple Street 12',
        city: 'Copenhagen',
        postalCode: '1001',
    },
    totalPrice: 50,
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
    timestamp: '2024-11-20T12:00:00.000Z',
};
export const acceptedOrdersMock2 = {
    _id: '673de997fa60e0a917658804',
    customerID: '672df427f54107237ff75565',
    restaurantID: '672de88ff54107237ff75565',
    status: 3,
    address: {
        _id: '672df723f54107237ff75573',
        street: 'Maple Street 12',
        city: 'Aarhus',
        postalCode: '1001',
    },
    totalPrice: 50,
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
};

export const ordersByIdMock = {
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
    status: 2,
    address: {
        _id: '672df723f54107237ff75573',
        street: 'Maple Street 12',
        city: 'Copenhagen',
        postalCode: '1001',
    },
    totalPrice: 50,
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
    timestamp: '2024-11-20T12:00:00.000Z',
};
export const acceptRejectOrderMock = {
    _id: '673de997fa60e0a917658804',
    customerID: '672df427f54107237ff75565',
    restaurantID: '672de88ff54107237ff75565',
    status: 1,
    address: {
        _id: '672df723f54107237ff75573',
        street: 'Maple Street 12',
        city: 'Aarhus',
        postalCode: '1001',
    },
    totalPrice: 50,
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
    rejectReason: 'Reason for rejecting',
};

export const feedbackOrderMock =     {
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
        employeeID: '111',
        feedbackID: '1',
        status: 2,
        address: {
            _id: '672df723f54107237ff75573',
            street: 'Maple Street 12',
            city: 'Copenhagen',
            postalCode: '1001',
        },
        totalPrice: 50,
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
        timestamp: '2024-11-20T12:00:00.000Z',
    };

export const deliveryOrdersMock = [
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
        employeeID: '111',
        status: 2,
        address: {
            _id: '672df723f54107237ff75573',
            street: 'Maple Street 12',
            city: 'Copenhagen',
            postalCode: '1001',
        },
        totalPrice: 50,
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
        timestamp: '2024-11-20T12:00:00.000Z',
    },
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
        employeeID: '111',
        status: 2,
        address: {
            _id: '672df723f54107237ff75573',
            street: 'Maple Street 12',
            city: 'Copenhagen',
            postalCode: '1001',
        },
        totalPrice: 50,
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
        timestamp: '2024-11-20T12:00:00.000Z',
    }
]

export const ordersMockDataList = [ordersByIdMock];
export const acceptedOrdersMockList = [acceptedOrdersMock, acceptedOrdersMock2];
export const allOrdersMock = {ordersByIdMock, acceptedOrdersMock, acceptedOrdersMock2};
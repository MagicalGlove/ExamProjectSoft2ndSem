export const mockFeedbackAPI = {
    _id: 'someObjectId',
    foodRating: 5,
    overallRating: 4,
    deliveryRating: 3,
};

export const mockFeedbackPayloadAPI = {
    foodRating: 5,
    overallRating: 4,
    deliveryRating: 3,
    orderId: 'someObjectId',
};

export const incorrectMockFeedbackPayloadAPI = {
    foodRating: 5,
    overallRating: 4,
    deliveryRating: 'w',
    orderId: 'wrongObjectId',
};
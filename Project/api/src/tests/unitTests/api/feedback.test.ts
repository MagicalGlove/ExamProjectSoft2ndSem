import * as orderAndFeedbackRepository from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import request from 'supertest';
import app from '../../../index.ts';

jest.mock('../../../monolithOrderAndFeedback/orderAndFeedbackRepository.ts');

describe('POST /createFeedback', () => {
    const mockFeedback = {
        _id: 'someObjectId',
        foodRating: 5,
        overallRating: 4,
        deliveryRating: 3,
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return feedback object if feedback creation is successful', async () => {
        (
            orderAndFeedbackRepository.createFeedbackAndLinkOrder as jest.Mock
        ).mockResolvedValue(mockFeedback);

        const response = await request(app).post('/createFeedback').send({
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: 'someObjectId',
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockFeedback);
    });

    it('should return 401 error if feedback creation is unsuccessful', async () => {
        (
            orderAndFeedbackRepository.createFeedbackAndLinkOrder as jest.Mock
        ).mockResolvedValue(null);

        const response = await request(app).post('/createFeedback').send({
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: 'someObjectId',
        });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid feedback data' });
    });
});

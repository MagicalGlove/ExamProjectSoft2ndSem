import * as orderAndFeedbackRepository from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import request from 'supertest';
import app from '../../../index.ts';
import {
    incorrectMockFeedbackPayloadAPI,
    mockFeedbackAPI,
    mockFeedbackPayloadAPI,
} from '../../mocks/feedbackMocksAPI.ts';

jest.mock('../../../monolithOrderAndFeedback/OrderAndFeedbackRepository');

describe('POST /createFeedback', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return feedback object if feedback creation is successful', async () => {
        (
            orderAndFeedbackRepository.createFeedbackAndLinkOrder as jest.Mock
        ).mockResolvedValue(mockFeedbackAPI);

        const response = await request(app)
            .post('/createFeedback')
            .send(mockFeedbackPayloadAPI);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockFeedbackAPI);
    });

    it('should return 401 error if feedback creation is unsuccessful', async () => {
        (
            orderAndFeedbackRepository.createFeedbackAndLinkOrder as jest.Mock
        ).mockResolvedValue(null);

        const response = await request(app)
            .post('/createFeedback')
            .send(incorrectMockFeedbackPayloadAPI);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid feedback data' });
    });

    it('should return 500 error if there is an internal server error', async () => {
        (
            orderAndFeedbackRepository.createFeedbackAndLinkOrder as jest.Mock
        ).mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/createFeedback')
            .send(mockFeedbackPayloadAPI);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error creating feedback' });
    });
});

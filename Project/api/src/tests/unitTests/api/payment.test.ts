import request from 'supertest';
import app from '../../../index.ts';
import { pay } from '../../../paymentService/stripePaymentServiceAdapter.ts';

jest.mock('axios');

describe('Post /paymentService/validatePayment', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('Should return true', async () => {
        const response = await pay(1000, 'customerId');
        expect(response).toEqual(true);
    });

    it('Amount too small, should return false', async () => {
        const response = await pay(100, 'customerId');
        expect(response).toEqual(false);
    });

    it('Should return 200 status code', async () => {
        const response = await request(app)
            .post('/paymentService/validatePayment')
            .send({ price: 1000, customerId: 'customerId' });

        expect(response.status).toBe(200);
    });

    it('Amount too small, should return 400 status code', async () => {
        const response = await request(app)
            .post('/paymentService/validatePayment')
            .send({ price: 100, customerId: 'customerId' });

        expect(response.status).toBe(400);
    });
});

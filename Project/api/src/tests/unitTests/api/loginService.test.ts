import request from 'supertest';
import express from 'express';
import { loginRouter } from '../../../loginService/loginRoutes.ts';
import * as userRepository from '../../../loginService/userRepository.ts';

jest.mock('../../../loginService/userRepository');

const app = express();
app.use(express.json());
app.use('/loginService', loginRouter);

describe('POST /loginService/validateCredentials', () => {
    const mockUser = { id: 1, username: 'testUser', role: 'user' };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return user object if credentials are valid', async () => {
        (userRepository.validateCredentials as jest.Mock).mockResolvedValue(
            mockUser
        );

        const response = await request(app)
            .post('/loginService/validateCredentials')
            .send({ username: 'testUser', password: 'validPassword' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });

    it('should return 401 error for invalid credentials', async () => {
        (userRepository.validateCredentials as jest.Mock).mockResolvedValue(
            null
        );

        const response = await request(app)
            .post('/loginService/validateCredentials')
            .send({ username: 'testUser', password: 'wrongPassword' });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid credentials' });
    });

    it('should return 500 error if there is an internal server error', async () => {
        (userRepository.validateCredentials as jest.Mock).mockRejectedValue(
            new Error('Database error')
        );

        const response = await request(app)
            .post('/loginService/validateCredentials')
            .send({ username: 'testUser', password: 'validPassword' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: 'Error validating credentials',
        });
    });
});

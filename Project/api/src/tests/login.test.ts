import request from 'supertest';
import app from '../index.ts';
import * as userRepository from '../loginService/userRepository.ts';

jest.mock('../loginService/userRepository');

describe('POST /login', () => {
    const mockUser = { id: 1, username: 'testUser', role: 'user' };

    beforeEach(() => {
        jest.resetAllMocks()
    });

    it('should return user object if login is successful', async () => {
        (userRepository.validateCredentials as jest.Mock).mockResolvedValue(mockUser);

        const response = await request(app).post('/login').send({ username: 'testUser', password: 'validPassword' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });

    it('should return 401 error if login fails due to invalid credentials', async () => {
        (userRepository.validateCredentials as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .post('/login')
            .send({ username: 'testUser', password: 'wrongPassword' });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid username or password' });
    });
});

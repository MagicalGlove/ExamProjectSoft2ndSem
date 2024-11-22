import request from 'supertest';
import app from '../../../index.ts';
import axios from 'axios';

jest.mock('axios');

describe('POST /login', () => {
    const mockUser = { id: 1, username: 'testUser', role: 'user' };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return user object if login is successful', async () => {
        (axios.post as jest.Mock).mockResolvedValue({ data: mockUser });

        const response = await request(app).post('/login').send({ username: 'testUser', password: 'validPassword' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });

    it('should return 401 error if login fails due to invalid credentials', async () => {
        (axios.post as jest.Mock).mockRejectedValue({
            response: { status: 401, data: { error: 'Invalid username or password' } },
        });
    
        const response = await request(app)
            .post('/login')
            .send({ username: 'testUser', password: 'wrongPassword' });
    
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid username or password' });
    });
    

    it('should return 500 error if the login service is unavailable', async () => {
        (axios.post as jest.Mock).mockRejectedValue(new Error('LoginService is unavailable'));

        const response = await request(app)
            .post('/login')
            .send({ username: 'testUser', password: 'validPassword' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error finding user' });
    });
});

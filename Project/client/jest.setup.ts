import { setupServer } from 'msw/node';
import { handlers } from './src/mocks/handlers';

jest.mock('./src/constants', () => ({
    VITE_BASE_URL: 'http://localhost:3001',
}));

const server = setupServer(...handlers);

beforeEach(() => jest.restoreAllMocks());
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
    jest.resetAllMocks();
    server.close();
});

import express from 'express';
import { validateCredentials } from './userRepository.ts';
import { UserCredentials } from '../interfaces/users.ts';

const loginRouter = express.Router();

loginRouter.post('/validateCredentials', async (req, res) => {
    try {
        const credentials: UserCredentials = req.body;
        const user = await validateCredentials(credentials);
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error validating credentials' });
    }
});

export { loginRouter };

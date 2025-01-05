import express from 'express';
import { validateCredentials } from './userRepository.ts';
import { UserCredentials } from '../interfaces/users.ts';

const loginRouter = express.Router();

loginRouter.post('/validateCredentials', async (req /*source*/, res) => {
    try {
        //Validate input
        if (
            typeof req.body.username !== 'string' ||
            typeof req.body.password !== 'string' ||
            !/^\w+$/.test(req.body.username) || // Only allow alphanumeric and underscores
            !/^\w+$/.test(req.body.password) // Only allow alphanumeric and underscores
        ) {
            res.status(400).json({
                error: 'invalid input',
            });
            return;
        }

        const credentials: UserCredentials = req.body; //sanitized

        //Validate credentials is a sink
        //user is tainted
        const user = await validateCredentials(credentials);
        if (!user) {
            //response is static therefore not tainted
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            //response is sink
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        //response is static therefore not tainted
        res.status(500).json({ error: 'Error validating credentials' });
    }
});

export { loginRouter };

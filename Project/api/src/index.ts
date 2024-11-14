import express, { Request, Response } from 'express';
import cors from 'cors';
import { validateCredentials } from './loginService/userRepository.ts';
import { getAllRestaurants } from './RestaurantService/dbFunctions.ts';
const app = express();

app.use(cors());
app.use(express.json());

        app.post('/login', async (req: Request, res: Response) => {
            try {
                const { username, password } = req.body;

                const user = await validateCredentials(username, password);

                if (!user) {
                    res.status(401).json({
                        error: 'Invalid username or password',
                    });
                    return;
                }

                res.json(user);
            } catch (error) {
                console.error('Error finding user:', error); // eslint-disable-line no-console
                res.status(500).json({ error: 'Error finding user' });
            }
        });

        app.get('/restaurants', async (req: Request, res: Response) => {
            try {
                const restaurants = await getAllRestaurants();

                res.json(restaurants);
            } catch (error) {
                console.error('Error fetching restaurants:', error); // eslint-disable-line no-console
                res.status(500).json({
                    error: 'An error occurred while fetching restaurants',
                });
            }
        });

export default app;

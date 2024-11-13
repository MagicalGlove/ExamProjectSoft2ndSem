import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './loginService/User.ts';
import { MenuItem, Restaurant } from './RestaurantService/Restaurant.ts';

dotenv.config();

const databaseName = 'SoftExam';

export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: process.env.DATABASE_URL,
    database: databaseName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [User, Restaurant, MenuItem],
});

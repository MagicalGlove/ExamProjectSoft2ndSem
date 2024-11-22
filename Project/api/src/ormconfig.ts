import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './loginService/User.ts';
import {
    MenuItem,
    Restaurant,
    Address,
} from './RestaurantService/Restaurant.ts';
import { Order } from './monolithOrderAndFeedback/Order.ts';
import { Feedback } from './monolithOrderAndFeedback/Feedback.ts';

dotenv.config();

const isTestEnv = process.env.NODE_ENV === 'test';
const databaseName = isTestEnv ? 'SoftExamTest' : 'SoftExam';

export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: process.env.DATABASE_URL,
    database: databaseName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [User, Restaurant, MenuItem, Order, Feedback, Address],
});

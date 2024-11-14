import {AppDataSource} from '../ormconfig.ts';
import { User } from './User.ts';

const userRepository = AppDataSource.getMongoRepository(User);

async function validateCredentials(username: string, password: string) {
    const user = await userRepository.findOne({ where: {
        username: username,
        password: password
    } });

    if (!user) {
        return null;
    }

    return user;
}

export { validateCredentials};

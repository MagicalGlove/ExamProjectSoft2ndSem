import { UserCredentials } from '../interfaces/users.ts';
import { AppDataSource } from '../ormconfig.ts';
import { User, Address } from './User.ts';

const userRepository = AppDataSource.getMongoRepository(User);
const addressRepository = AppDataSource.getMongoRepository(Address);

async function validateCredentials(credentials: UserCredentials) {
    const { username, password } = credentials;

    const user = await userRepository.findOne({
        where: {
            username: username,
            password: password,
        },
    });
    console.log(user);
    if (!user) {
        console.log('User not found');
        return null;
    }
    const address = await addressRepository.findOne({
        where: { _id: user.address },
    });
    if (!address) {
        console.log('User does not have an address');
    } else {
        user.address = address;
    }

    return user;
}

export { validateCredentials };

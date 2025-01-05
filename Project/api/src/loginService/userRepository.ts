import { UserCredentials } from '../interfaces/users.ts';
import { AppDataSource } from '../ormconfig.ts';
import { User, Address } from './User.ts';
import { ObjectId } from 'mongodb';
const userRepository = AppDataSource.getMongoRepository(User);
const addressRepository = AppDataSource.getMongoRepository(Address);

async function validateCredentials(credentials: UserCredentials /*source*/) {
    const { username /*sanitized*/, password /*sanitized*/ } = credentials;

    //validate input
    if (
        typeof username !== 'string' || 
        typeof password !== 'string' ||
        username.trim() === '' ||
        password.trim() === '' ||
        !/^\w+$/.test(username) || // Only allow alphanumeric and underscores
        !/^\w+$/.test(password)    // Only allow alphanumeric and underscores
    ) {
        throw new Error('Invalid credentials format');
    }

    const user = await userRepository.findOne({
        where: {
            username: username,
            password: password,
        },
    });

    if (!user) {
        //Static return
        return null;
    }

      //validate user
    if (!(user?._id instanceof ObjectId) ) {
        console.error('Invalid user id');
        throw new Error('Invalid user');
    }
    
    const address = await addressRepository.findOne({
        where: { _id: user.address },
    });


    if (!address) {
        console.error('User does not have an address');
    } else {
        validateAddress(address);
        user.address = address;
    }
    //user is sanitized
    //sink
    return user;
}

//function to validate address
function validateAddress(address: Address ) {
    if (
        address._id instanceof ObjectId === false ||
        typeof address.street !== 'string' || address.street.trim() === '' ||
        typeof address.city !== 'string' || address.city.trim() === '' ||
        typeof address.postalCode !== 'string' || address.postalCode.trim() === '' 
    ) {
        throw new Error('Invalid address format');
    }

    if (!/^\d+$/.test(address.postalCode)) {
        throw new Error('Invalid postal code');
    }
}

export { validateCredentials };

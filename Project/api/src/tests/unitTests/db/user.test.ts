import { AppDataSource } from '../../../ormconfig.ts';
import { ObjectId } from 'mongodb';
import { validateCredentials } from '../../../loginService/userRepository.ts';
import { Address, User } from '../../../loginService/User.ts';

describe('Database functionality for login tests', () => {
    const userRepository = AppDataSource.getMongoRepository(User);
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    beforeEach(async () => {
        const userCredentials = {
            username: 'hesteAbe',
            password: '123456789',
        };

        await userRepository.save(userCredentials);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should log in and get address', async () => {
        const addressRepository = AppDataSource.getMongoRepository(Address);
        const address: Address = {
            _id: new ObjectId('672df723f54107237ff75573'),
            street: 'Maple Street 12',
            city: 'Copenhagen',
            postalCode: '1001',
        };

        jest.spyOn(addressRepository, 'findOne').mockResolvedValue(address);

        const userCredentials = {
            username: 'hesteAbe',
            password: '123456789',
        };

        const user = await validateCredentials(userCredentials);

        expect(user).not.toBeNull();
        expect(user?.username).toEqual('hesteAbe');
        expect(user?.password).toEqual('123456789');
        expect(user?.address).toEqual(address);
        jest.restoreAllMocks();
    });

    it('should succesfully log in but have no address', async () => {
        const userCredentials = {
            username: 'hesteabe',
            password: '123456789',
        };
        const user = await validateCredentials(userCredentials);

        if (!user) throw new Error('No user found!');

        expect(user).not.toBeNull();
    });

    it('should fail to log in because wrong username', async () => {
        const userCredentials = {
            username: 'wrongUsername',
            password: '123456789',
        };
        const user = await validateCredentials(userCredentials);

        expect(user).toBeNull();
    });
});

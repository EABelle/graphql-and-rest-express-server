import {UserRepository} from '../user.repository';
const dbHandler = require('../__utils__/db-handler');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('UserRepository ', () => {

    describe('on create method', () => {
        it('can create correctly', async () => {
            await expect(() => UserRepository.create(user1))
                .not
                .toThrow();
        });

        it(`doesn't create without a name`, async () => {
            // @ts-ignore
            await expect(UserRepository.create(userWithoutName))
                .rejects.toThrow();
        });
    });


});

const user1 = {
    name: 'User 1',
    avatar: 'user1.jpg',
};

const userWithoutName = {
    avatar: 'user1.jpg',
};

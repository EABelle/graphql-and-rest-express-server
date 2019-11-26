import app from './app';
import {apiEndpoints} from './api/config';

const request = require('supertest');

const createUserRequestFixture = (req?: any) => ({
    ...{name: 'aName', avatar: 'anAvatar'},
    ...req
});

const UserRepository = require('./api/repository/user.repository');
jest.mock('./api/repository/user.repository');

describe('Workast app', () => {

    const DEFAULT_API_KEY = process.env.API_KEY;
    const TEST_API_KEY = 'TEST_API_KEY';
    const NOT_VALID_API_KEY = 'NOT_VALID_API_KEY';

    it('should return 404', async () => {
        await request(app)
            .get('/not-valid')
            .expect(404);
    });

    it('should check health', async () => {
        await request(app)
            .get('/health')
            .expect(200);
    });

    describe('Authorization', () => {

        beforeEach(() => {
            jest.resetModules(); // this is important - it clears the cache
            process.env.API_KEY = TEST_API_KEY;
        });

        afterEach(() => {
            process.env.API_KEY = DEFAULT_API_KEY;
        });

        it('should return 401 when the API Key is not valid', async () => {
            await request(app)
                .get('/')
                .set('x-api-key', NOT_VALID_API_KEY)
                .expect(401);
        });

        it('should not return 401 when the API Key is valid', async () => {
            await request(app)
                .get('/')
                .set('x-api-key', TEST_API_KEY)
                .expect((res: any) => res.status !== 401);
        });
    });

    describe('POST /users', () => {

        beforeAll(() => {
            jest.resetModules();
            process.env.API_KEY = TEST_API_KEY;
        });

        it('should save a users when the users is valid', async () => {
            const createUser = jest.fn();
            createUser.mockReturnValueOnce(new Promise (resolve => resolve({
                _id: 'anId',
                name: 'aName',
                avatar: 'anAvatar'
            })));
            UserRepository.UserRepository.create = createUser;
            await request(app)
                .post(apiEndpoints.users)
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createUserRequestFixture())
                .expect('Content-Type', /json/)
                .expect(200, {
                    id: 'anId',
                    name: 'aName',
                    avatar: 'anAvatar'
                });
        });
    });
});


import app from './app';

const request = require('supertest');

const createUserRequestFixture = (req?: any) => ({
    ...{name: 'aName', avatar: 'anAvatar'},
    ...req
});

const UserService = require('./api/service/user.service');
jest.mock('./api/service/user.service');


describe('Workast app', () => {
    describe('POST /user', () => {
        it('should save a user when the user is valid', async () => {
            const createUser = jest.fn();
            createUser.mockReturnValue(new Promise (resolve => resolve({
                _id: 'anId',
                name: 'aName',
                avatar: 'anAvatar'
            })));
            UserService.UserService.createUser = createUser;
            await request(app)
                .post('/user')
                .set('Accept', 'application/json')
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


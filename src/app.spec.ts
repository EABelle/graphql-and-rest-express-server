import app from './app';
import {apiEndpoints} from './api/config';

const request = require('supertest');

const createUserRequestFixture = (req?: any) => ({
    ...{name: 'aName', avatar: 'anAvatar'},
    ...req
});

const createArticleRequestFixture = (req?: any) => ({
    _id: 'anId',
    title: 'My Article',
    text: 'This is my first article',
    tags: ['tag1', 'tag2'],
    userId: 'aUserId',
    ...req
});

const UserRepository = require('./api/repository/user.repository');
jest.mock('./api/repository/user.repository');

const ArticleRepository = require('./api/repository/article.repository');
jest.mock('./api/repository/article.repository');

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

        it('should save a user when the user is valid', async () => {
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

        it('should return a 400 when the user from request does not have name', async () => {
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
                .send(createUserRequestFixture({name: undefined}))
                .expect('Content-Type', /json/)
                .expect(400);
        });
    });

    describe('POST /articles', () => {

        beforeAll(() => {
            jest.resetModules();
            process.env.API_KEY = TEST_API_KEY;
        });

        it('should return 400 a users when the user request does not have userId', async () => {
            await request(app)
                .post(apiEndpoints.users)
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createArticleRequestFixture({userId: undefined}))
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should return 200 for valid articles', async () => {
            const createArticle = jest.fn();
            createArticle.mockReturnValueOnce(new Promise (resolve => resolve({
                '_id': 'anId',
                'title': 'My Article',
                'text': 'This is my first article',
                'tags': ['tag1', 'tag2'],
                'userId': 'aUserId'
            })));
            ArticleRepository.ArticleRepository.create = createArticle;
            await request(app)
                .post(apiEndpoints.articles)
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createArticleRequestFixture())
                .expect('Content-Type', /json/)
                .expect(200, {
                    id: 'anId',
                    title: 'My Article',
                    text: 'This is my first article',
                    tags: ['tag1', 'tag2'],
                    userId: 'aUserId'
                });
        });
    });
});


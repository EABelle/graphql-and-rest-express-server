import {ArticleRepository} from '../article.repository';
const dbHandler = require('../__utils__/db-handler');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('ArticleRepository ', () => {

    describe('on create method', () => {

        it('can create correctly', async () => {
            await expect(() => ArticleRepository.create(article1))
                .not
                .toThrow();
        });

        it(`can create without a title`, async () => {
            // @ts-ignore
            await expect(() => ArticleRepository.create(articleWithoutTitle))
                .not
                .toThrow();
        });

        it(`can create without a text`, async () => {
            // @ts-ignore
            await expect(() => ArticleRepository.create(articleWithoutText))
                .not
                .toThrow();
        });

        it(`can create with empty tags`, async () => {
            // @ts-ignore
            await expect(() => ArticleRepository.create(articleWithEmptyTags))
                .not
                .toThrow();
        });

        it(`can't create without a userId`, async () => {
            // @ts-ignore
            await expect(ArticleRepository.create(articleWithoutUserId))
                .rejects
                .toThrow();
        });
    });

    describe('on update method', () => {
        it('can update', async () => {
            const article = await ArticleRepository.create(article1);
            await expect(() => ArticleRepository.update(article._id, articleUpdatePayload))
                .not
                .toThrow();
        });
        it('updates the entire document', async () => {
            const article = await ArticleRepository.create(article1);
            await expect(ArticleRepository.update(article._id, articleUpdatePayload))
                .resolves.toEqual({_id: article._id, ...articleUpdatePayload});
        });
    });

    describe('on delete method', () => {
        it('can delete the document', async () => {
            const article = await ArticleRepository.create(article1);
            await expect(() => ArticleRepository.delete(article._id))
                .not
                .toThrow();
        });
    });
});

const article1 = {
    'title': 'My Article',
    'text': 'This is my first article',
    'tags': ['tag1', 'tag2'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

const articleWithoutTitle = {
    'text': 'This is my first article',
    'tags': ['tag1', 'tag2'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

const articleWithoutText = {
    'title': 'My Article',
    'tags': ['tag1', 'tag2'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

const articleWithoutUserId = {
    'title': 'My Article',
    'text': 'This is my first article',
    'tags': ['tag1', 'tag2'],
};

const articleWithEmptyTags = {
    'title': 'My Article',
    'text': 'This is my first article',
    'tags': [],
    'userId': '5ddc3ea01614280e2846d3d8'
};

const articleUpdatePayload = {
    'title': 'My Article2',
    'text': 'This is my second article',
    'tags': ['tag1', 'tag2', 'tag3'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

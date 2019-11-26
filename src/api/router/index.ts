import {Router} from 'express';
import {UserController} from '../controller/user.controller';
import {ArticleController} from '../controller/article.controller';
import {param, body} from 'express-validator';

const validations = {
    user: {
        post: [body('name').exists()]
    },
    article: {
        get: [],
        post: [body('userId').exists()],
        put: [param('id').exists(), body('userId').exists()],
        delete: [param('id').exists()]
    }
};

export const userRouter: Router = Router()
    .post('/', validations.user.post, UserController.createUser);

export const articleRouter: Router = Router()
    .get('/', validations.article.get, ArticleController.getArticles)
    .post('/', validations.article.post, ArticleController.createArticle)
    .put('/:id', validations.article.put, ArticleController.editArticle)
    .delete('/:id', validations.article.delete, ArticleController.deleteArticle);

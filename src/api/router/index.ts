import {Router} from 'express';
import {UserController} from '../controller/user.controller';
import {ArticleController} from '../controller/article.controller';

export const userRouter: Router = Router()
    .post('/', UserController.createUser);

export const articleRouter: Router = Router()
    .get('/', ArticleController.getArticles)
    .post('/', ArticleController.createArticle)
    .put('/:id', ArticleController.editArticle)
    .delete('/:id', ArticleController.deleteArticle);

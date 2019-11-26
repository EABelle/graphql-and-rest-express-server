import {NextFunction, Response, Request} from 'express';
import {ArticlePayload, ArticleResponse} from '../contract';
import {Article} from '../domain/Article';
import {ArticleService} from '../service/article.service';
import {validationResult} from 'express-validator';

export class ArticleController {

    public static async getArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
        const tags: string[] = req.query.tag;
        try {
            const articles: Article[] = await ArticleService.getArticles(tags);
            const articlesResponse: ArticleResponse[] = articles.map(article => ({
                id: article._id,
                title: article.title,
                text: article.text,
                tags: article.tags,
                userId: article.userId
            }));
            res.json(articlesResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async createArticle(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const articleRequest: ArticlePayload = req.body;
        try {
            const article: Article = await ArticleService.createArticle(articleRequest);
            const articleResponse: ArticleResponse = {
                id: article._id,
                title: article.title,
                text: article.text,
                tags: article.tags,
                userId: article.userId
            };
            res.json(articleResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async editArticle(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        const articleRequest: ArticlePayload = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.query.id;
        try {
            const article: Article = await ArticleService.updateArticle(id, articleRequest);
            const articleResponse: ArticleResponse = {
                id: article._id,
                title: article.title,
                text: article.text,
                tags: article.tags,
                userId: article.userId
            };
            res.json(articleResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async deleteArticle(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.query.id;
        try {
            await ArticleService.deleteArticle(id);
            res.json({});
        } catch (e) {
            next(new Error(e.message));
        }
    }
}

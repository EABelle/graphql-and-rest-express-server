import {NextFunction, Response, Request} from 'express';
import {ArticlePayload, ArticleResponse} from '../contract';
import {Article} from '../domain/Article';
import {ArticleService} from '../service/article.service';

export class ArticleController {

    public static async getArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tags: string[] = req.query.tag;
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

    public static async createArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const articleRequest: ArticlePayload = req.body;
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

    public static async editArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const articleRequest: ArticlePayload = req.body;
            const id: string = req.query.id;
            const article: Article = await ArticleService.updateArticle(id, articleRequest);
            console.log(article);
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

    public static async deleteArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.query.id;
            await ArticleService.deleteArticle(id);
            res.json({});
        } catch (e) {
            next(new Error(e.message));
        }
    }
}

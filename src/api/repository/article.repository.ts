import {ArticleModel} from '../model/article.model';
import {Article} from '../domain/Article';
import {ArticlePayload} from '../contract';

export class ArticleRepository {

    static async create(articlePayload: ArticlePayload): Promise<Article> {
        const articleModel = new ArticleModel(articlePayload);
        const article: Article = await articleModel.save();
        return article;
    }

    static async update(id: string, payload: ArticlePayload): Promise<Article> {
        return await ArticleModel.findOneAndUpdate(id, payload, {new: true}, (err: Error, document: Article) => {
            if (err) {
                Promise.reject(err);
            }
            Promise.resolve(document);
        });
    }

    static async delete(id: string): Promise<void> {
        await ArticleModel.find(id).remove().exec();
    }

    static async getAll(tags: string[]): Promise<Article[]> {
        const articles = await ArticleModel.find({tags: { $all: tags }});
        return articles;
    }
}

import {ArticlePayload} from '../contract';
import {ArticleRepository} from '../repository/article.repository';
import {Article} from '../domain/Article';

export class ArticleService {

    static async getArticles(tags: string[]): Promise<Article[]> {
        return await ArticleRepository.getAll(tags);
    }

    static async createArticle(articlePayload: ArticlePayload): Promise<Article> {
        return await ArticleRepository.create(articlePayload);
    }

    static async updateArticle(id: string, articlePayload: ArticlePayload): Promise<Article> {
        return await ArticleRepository.update(id, articlePayload);
    }

    static async deleteArticle(id: string): Promise<void> {
        return await ArticleRepository.delete(id);
    }


}

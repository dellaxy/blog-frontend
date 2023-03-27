import { ArticleBody } from './body';
import { Category } from './category';

export class Article {
    id!: number;
    date!: Date;
    category!: Category;
    leadParagraph!: string;
    title!: string;
    image!: string;
    body: ArticleBody;
}

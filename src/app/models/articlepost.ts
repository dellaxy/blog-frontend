import { ArticleBody } from './body';

export class ArticlePost {
    id!: number;
    date!: Date;
    category!: number;
    lead!: string;
    title!: string;
    image!: string;
    body: ArticleBody;
}

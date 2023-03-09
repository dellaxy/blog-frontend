import { Category } from './category';

export class Article {
    id!: number;
    date!: Date;
    category!: Category;
    leadParagraph!: string;
    title!: string;
    image!: string;
    categoryColor!: string;

}

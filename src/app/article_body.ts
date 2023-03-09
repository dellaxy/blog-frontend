import { Category } from "./category";

export class ArticleWithBody {
    id!: number;
    date!: Date;
    category!: Category;
    leadParagraph!: string;
    title!: string;
    image!: string;
    categoryColor!: string;
    content!: string;
    lastUpdated!: Date;
}

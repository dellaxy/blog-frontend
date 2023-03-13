import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  articles: Article[];
  articlesPerPage: number = 9;
  currentPage: number = 1;
  totalPages: number;

  constructor(private articleservice: ArticleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getArticlesPerPage(this.currentPage);
  }

  getArticlesPerPage(currentPage: number) {
    this.currentPage = currentPage;
    const startingIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endingIndex = this.currentPage * this.articlesPerPage;
    this.route.queryParams.subscribe((params) => {
      if (params['categoryId']) {
        this.getArticlesByCategory(params['categoryId'], startingIndex, endingIndex);
      } else {
        this.getAllArticles(startingIndex, endingIndex);
      }
    });
  }

  getAllArticles(startingIndex: number, endingIndex: number) {
    this.articleservice.getAllArticles().subscribe((response: Article[]) => {
      this.articles = response.slice(startingIndex, endingIndex);
      this.totalPages = Math.ceil(response.length / this.articlesPerPage);
    });
  }

  getArticlesByCategory(id: number, startingIndex: number, endingIndex: number) {
    this.articleservice.getArticlesByCategoryId(id).subscribe((response: Article[]) => {
      this.articles = response.slice(startingIndex, endingIndex);
      this.totalPages = Math.ceil(response.length / this.articlesPerPage);
    });
  }

  getFormattedDate(date: Date): string {
    const today = new Date();
    const articleDate = new Date(date);

    if (articleDate.toDateString() === today.toDateString()) {
      return 'Today ' + articleDate.toLocaleTimeString([], { hour: '2-digit' }) + ':00';
    } else if (articleDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
      return 'Yesterday ' + articleDate.toLocaleTimeString([], { hour: '2-digit' }) + ':00';
    } else {
      return articleDate.toLocaleDateString();
    }
  }
}


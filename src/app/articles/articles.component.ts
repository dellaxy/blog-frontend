import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';
import { Title } from "@angular/platform-browser"

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
  isLoaded: boolean = false;

  constructor(private articleservice: ArticleService, private route: ActivatedRoute, private titleService: Title) {
  }

  ngOnInit() {
    this.getArticlesPerPage(this.currentPage);
  }

  getArticlesPerPage(currentPage: number) {
    this.currentPage = currentPage;
    const startingIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endingIndex = this.currentPage * this.articlesPerPage;
    this.route.queryParams.subscribe((params) => {
      window.scrollTo(0, 0);
      if (params['categoryName'])
        this.titleService.setTitle("Coffe Blog - " + params['categoryName']);
      else
        this.titleService.setTitle("Coffe Blog - Articles");
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
      this.isLoaded = true;
    });
  }

  getArticlesByCategory(id: number, startingIndex: number, endingIndex: number) {
    this.articleservice.getArticlesByCategoryId(id).subscribe((response: Article[]) => {
      this.articles = response.slice(startingIndex, endingIndex);
      this.totalPages = Math.ceil(response.length / this.articlesPerPage);
      this.isLoaded = true;
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


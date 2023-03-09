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

  constructor(private articleservice: ArticleService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params["categoryId"])
        this.getArticlesByCategory(params["categoryId"]);
      else
        this.getAllArticles();
    });
  }

  getAllArticles() {
    this.articleservice.getAllArticles().subscribe(
      (response: Article[]) => {
        this.articles = response;
      }
    );
  }
  getArticlesByCategory(id: number) {
    this.articleservice.getArticlesByCategoryId(id).subscribe(
      (response: Article[]) => {
        this.articles = response;
        console.log(this.articles);
      }
    );
  }

  getFormattedDate(date: Date): string {
    const today = new Date();
    const articleDate = new Date(date);

    if (articleDate.toDateString() === today.toDateString()) {
      return 'Today ' + articleDate.toLocaleTimeString([], { hour: '2-digit' }) + ":00";
    } else if (articleDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
      return 'Yesterday ' + articleDate.toLocaleTimeString([], { hour: '2-digit' }) + ":00";
    } else {
      return articleDate.toLocaleDateString();
    }
  }
}

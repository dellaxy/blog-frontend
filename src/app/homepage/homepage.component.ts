import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';




@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']

})

export class HomePageComponent implements OnInit {

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
      }
    );
  }



}



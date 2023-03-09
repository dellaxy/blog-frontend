import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ArticleWithBody } from '../article_body';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: ArticleWithBody;

  constructor(private articleservice: ArticleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getArticleById(this.route.snapshot.params["id"]);

  }

  getArticleById(id: number) {
    this.articleservice.getArticleById(id).subscribe(
      (response: ArticleWithBody) => {
        this.article = response;
        console.log(this.article);

      }
    );
  }

}

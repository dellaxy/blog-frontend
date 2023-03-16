import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  article: Article;

  constructor(private articleservice: ArticleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getArticleById(this.route.snapshot.params["id"]);

  }

  getArticleById(id: number) {
    this.articleservice.getArticleById(id).subscribe(
      (response: Article) => {
        this.article = response;
        console.log(this.article);

      }
    );
  }

}

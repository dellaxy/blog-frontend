import { Component, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  article: Article;
  content: SafeHtml;

  constructor(private articleservice: ArticleService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getArticleById(this.route.snapshot.params["id"]);
  }

  getArticleById(id: number) {
    this.articleservice.getArticleById(id).subscribe(
      (response: Article) => {
        this.article = response;
        this.content = this.sanitizer.bypassSecurityTrustHtml(this.article.body.content);
      }
    );
  }

}

import { Component } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { Category } from '../category';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ArticleBody } from '../body';
import { ArticlePost } from '../articlepost';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {
  faTrash = faTrash;
  faPencil = faPencil;

  categories: Category[];
  articles: Article[];

  tinymceapi = environment.tinyMceApiKey;

  deleteArticle: Article;
  updateArticle: Article;
  constructor(private articleservice: ArticleService) {
  }

  ngOnInit() {
    this.getAllCategories();
    this.getAllArticles();
  }


  getAllCategories(): void {
    this.articleservice.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      }
    );
  }

  getAllArticles(): void {
    this.articleservice.getAllArticles().subscribe(
      (response: Article[]) => {
        this.articles = response;
      }
    );
  }

  onModalOpen(article: Article, mode: string): void {
    const container = document.getElementById('article-cards');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      this.articleservice.getArticleById(article.id).subscribe(
        (response: Article) => {
          this.updateArticle = response;
        }
      );
      button.setAttribute('data-bs-target', '#updateArticleModal');
    }
    if (mode === 'delete') {
      this.deleteArticle = article;
      button.setAttribute('data-bs-target', '#deleteArticleModal');
    }
    container?.appendChild(button);
    button.click();
  }

  onAddArticle(form: NgForm) {
    const newArticle: ArticlePost = new ArticlePost();
    const date = new Date();
    newArticle.body = new ArticleBody();
    newArticle.title = form.value.title;
    newArticle.lead = form.value.leadParagraph;
    newArticle.category = form.value.category;
    newArticle.image = "img.jpg";
    newArticle.body.content = form.value.content;
    newArticle.body.last_update = date;
    newArticle.date = date;

    this.articleservice.createArticle(newArticle).subscribe(
      (response: ArticlePost) => {
        form.reset();
        document.getElementById('close-addmodal')?.click();
        this.getAllArticles();
      }
    );
  }

  onDeleteArticle(articleId: number) {
    this.articleservice.deleteArticle(articleId).subscribe(
      (response: Article) => {
        this.getAllArticles();
        document.getElementById('close-modal')?.click();
      }
    );
  }

  onUpdateArticle(form: NgForm) {
    const date = new Date();
    const article = new ArticlePost();
    article.id = this.updateArticle.id;
    article.body = this.updateArticle.body;
    article.date = this.updateArticle.date;

    article.title = form.value.title;
    article.lead = form.value.leadParagraph;
    article.category = form.value.category;
    article.body.content = form.value.content;
    article.body.last_update = date;
    if (form.value.image == null)
      article.image = this.updateArticle.image;
    else
      article.image = form.value.image;

    this.articleservice.updateArticle(article).subscribe(
      (response: ArticlePost) => {
        form.reset();
        document.getElementById('close-updatemodal')?.click();
        this.getAllArticles();
      }
    );
  }

}


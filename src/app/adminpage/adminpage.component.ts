import { Component } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { Category } from '../category';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

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
        console.log(this.articles);
      }
    );
  }

  onAddArticle(form: NgForm) {
    console.log(form.value);
    /*this.articleservice.createArticle(form.value).subscribe(
      (response: Article) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });*/
  }

}
